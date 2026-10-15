import time
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from jose import jwt
from sqlalchemy.orm import Session
from starlette.concurrency import run_in_threadpool

import auth
import models
from database import SessionLocal, get_db

router = APIRouter()


# ---------- Streak ----------
@router.get("/streak")
def get_streak(
    tz_offset: int = 0,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    tz_offset = max(-840, min(840, tz_offset))
    shift = timedelta(minutes=tz_offset)
    rows = db.query(models.Progress.completed_at).filter(
        models.Progress.student_id == current_student.id
    ).all()

    days = set()
    for (ts,) in rows:
        if ts is None:
            continue
        if ts.tzinfo is None:
            ts = ts.replace(tzinfo=timezone.utc)
        days.add((ts.astimezone(timezone.utc) - shift).date())

    today = (datetime.now(timezone.utc) - shift).date()
    cursor = today if today in days else today - timedelta(days=1)
    current = 0
    while cursor in days:
        current += 1
        cursor -= timedelta(days=1)

    best = run = 0
    prev = None
    for d in sorted(days):
        run = run + 1 if prev is not None and d - prev == timedelta(days=1) else 1
        best = max(best, run)
        prev = d

    week = []
    for i in range(6, -1, -1):
        d = today - timedelta(days=i)
        week.append({"date": d.isoformat(), "label": d.strftime("%a"), "active": d in days})
    return {"current": current, "best": best, "completed_today": today in days, "week": week}


# ---------- Admin: dismiss a report ----------
@router.post("/community/posts/{post_id}/dismiss-report")
def dismiss_report(
    post_id: int,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not current_student.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required.")
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found.")
    post.is_reported = False
    db.commit()
    return {"message": "Report dismissed."}


# ---------- Data export ----------
@router.get("/me/export")
def export_my_data(
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    iso = lambda d: d.isoformat() if d else None
    sid = current_student.id
    posts = db.query(models.Post).filter(models.Post.student_id == sid).all()
    replies = db.query(models.Reply).filter(models.Reply.student_id == sid).all()
    progress = db.query(models.Progress).filter(models.Progress.student_id == sid).all()
    chats = db.query(models.ChatMessage).filter(models.ChatMessage.student_id == sid).all()
    return {
        "exported_at": datetime.utcnow().isoformat() + "Z",
        "account": {
            "id": sid, "name": current_student.name, "email": current_student.email,
            "is_admin": current_student.is_admin, "notify_on_reply": current_student.notify_on_reply,
            "created_at": iso(current_student.created_at),
        },
        "lesson_progress": [{"lesson": p.lesson_slug, "completed_at": iso(p.completed_at)} for p in progress],
        "community_posts": [{"id": p.id, "category": p.category, "title": p.title, "body": p.body, "created_at": iso(p.created_at)} for p in posts],
        "community_replies": [{"post_id": r.post_id, "body": r.body, "created_at": iso(r.created_at)} for r in replies],
        "chat_messages": [{"room": c.room, "body": c.body, "created_at": iso(c.created_at)} for c in chats],
    }


# ---------- Real-time chat ----------
CHAT_ROOMS = {"general": "General", "beginners": "Beginners", "setups": "Trade Setups"}


class ChatManager:
    def __init__(self):
        self.rooms: dict[str, set[WebSocket]] = {}

    async def connect(self, room: str, ws: WebSocket):
        await ws.accept()
        self.rooms.setdefault(room, set()).add(ws)

    def disconnect(self, room: str, ws: WebSocket):
        self.rooms.get(room, set()).discard(ws)

    def count(self, room: str) -> int:
        return len(self.rooms.get(room, ()))

    async def broadcast(self, room: str, payload: dict):
        dead = []
        for ws in list(self.rooms.get(room, ())):
            try:
                await ws.send_json(payload)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(room, ws)


chat = ChatManager()


def serialize_chat(m: models.ChatMessage) -> dict:
    return {
        "id": m.id,
        "body": m.body,
        "created_at": m.created_at.isoformat() if m.created_at else None,
        "student": {"id": m.student.id, "name": m.student.name},
    }


def _ws_student(ticket: str):
    try:
        payload = jwt.decode(ticket, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        if payload.get("purpose") != "ws":
            return None
        student_id = int(payload.get("sub"))
    except Exception:
        return None
    with SessionLocal() as db:
        s = db.query(models.Student).filter(models.Student.id == student_id).first()
        return {"id": s.id, "name": s.name} if s else None


def _save_chat_message(room: str, student_id: int, body: str) -> dict:
    with SessionLocal() as db:
        msg = models.ChatMessage(room=room, student_id=student_id, body=body)
        db.add(msg)
        db.commit()
        db.refresh(msg)
        return serialize_chat(msg)


def _delete_chat_message(message_id: int, student_id: int, is_admin: bool):
    with SessionLocal() as db:
        msg = db.query(models.ChatMessage).filter(models.ChatMessage.id == message_id).first()
        if not msg:
            return "missing", None
        if msg.student_id != student_id and not is_admin:
            return "forbidden", None
        room = msg.room
        db.delete(msg)
        db.commit()
        return "ok", room


@router.post("/chat/ticket")
def chat_ticket(current_student: models.Student = Depends(auth.get_current_student)):
    exp = datetime.utcnow() + timedelta(seconds=60)
    ticket = jwt.encode(
        {"sub": str(current_student.id), "purpose": "ws", "exp": exp},
        auth.SECRET_KEY, algorithm=auth.ALGORITHM,
    )
    return {"ticket": ticket}


@router.get("/chat/{room}/messages")
def chat_history(
    room: str,
    limit: int = 50,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if room not in CHAT_ROOMS:
        raise HTTPException(status_code=404, detail="Unknown room.")
    limit = max(1, min(limit, 100))
    rows = (
        db.query(models.ChatMessage)
        .filter(models.ChatMessage.room == room)
        .order_by(models.ChatMessage.id.desc())
        .limit(limit)
        .all()
    )
    rows.reverse()
    return {"messages": [serialize_chat(m) for m in rows]}


@router.delete("/chat/messages/{message_id}")
async def delete_chat_message(
    message_id: int,
    current_student: models.Student = Depends(auth.get_current_student),
):
    status, room = await run_in_threadpool(
        _delete_chat_message, message_id, current_student.id, current_student.is_admin
    )
    if status == "missing":
        raise HTTPException(status_code=404, detail="Message not found.")
    if status == "forbidden":
        raise HTTPException(status_code=403, detail="Not authorized to delete this message.")
    await chat.broadcast(room, {"type": "deleted", "id": message_id})
    return {"message": "Message deleted."}


@router.websocket("/ws/chat/{room}")
async def chat_ws(websocket: WebSocket, room: str, ticket: str = ""):
    user = await run_in_threadpool(_ws_student, ticket)
    if room not in CHAT_ROOMS or not user:
        await websocket.close(code=4401)
        return
    await chat.connect(room, websocket)
    await chat.broadcast(room, {"type": "presence", "count": chat.count(room)})
    sent: list[float] = []
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
                continue
            body = str(data.get("body", "")).strip()[:500]
            if not body:
                continue
            now = time.monotonic()
            sent = [t for t in sent if now - t < 30]
            if len(sent) >= 8:
                await websocket.send_json({"type": "error", "detail": "You're sending messages too fast — slow down."})
                continue
            sent.append(now)
            message = await run_in_threadpool(_save_chat_message, room, user["id"], body)
            await chat.broadcast(room, {"type": "message", "message": message})
    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        chat.disconnect(room, websocket)
        await chat.broadcast(room, {"type": "presence", "count": chat.count(room)})