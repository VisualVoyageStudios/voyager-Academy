import os
import secrets
from datetime import datetime, timedelta, timezone
import email_utils
import hmac, hashlib, base64

import time
import models
import schemas
import auth

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi import BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func
from sqlalchemy import Boolean

from database import get_db, SessionLocal
from fastapi import WebSocket, WebSocketDisconnect
from jose import jwt
from starlette.concurrency import run_in_threadpool

from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded


FRONTEND_URL = os.getenv("FRONTEND_URL", "https://visualvoyagestudios.github.io/voyager-Academy")

"models.Base.metadata.create_all(bind=engine)"

app = FastAPI(title="Voyager Academy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://visualvoyagestudios.github.io",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

import traceback
try:
    from extras import router as extras_router
    from assessments import router as assessments_router, has_server_quiz, best_scores
    app.include_router(assessments_router)
    app.include_router(extras_router)
except Exception:
    print("[startup] extras failed to load — chat/streak disabled:")
    traceback.print_exc()

CERT_SECRET = os.getenv("CERT_SECRET", "")
if len(CERT_SECRET) < 32:
    raise RuntimeError("CERT_SECRET must be set to a random value of 32+ characters")

def cert_code(student_id: int, track: str) -> str:
    mac = hmac.new(CERT_SECRET.encode(), f"cert:{student_id}:{track}".encode(), hashlib.sha256).digest()
    return base64.b32encode(mac)[:10].decode()

def make_cert_id(student_id: int, track: str) -> str:
    return f"VA-{student_id}-{track.upper()}-{cert_code(student_id, track)}"

@app.get("/")
def health_check():
    return {"status": "Voyager Academy API is running"}


@app.post("/auth/register", response_model=schemas.TokenResponse)
@limiter.limit("5/hour")
def register(request: Request, payload: schemas.RegisterRequest, db: Session = Depends(get_db)):
    student = models.Student(
        name=payload.name,
        email=payload.email,
        hashed_password=auth.hash_password(payload.password),
    )
    db.add(student)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="An account with that email already exists.")
    db.refresh(student)
    token = auth.create_access_token(student.id)
    result = schemas.TokenResponse(access_token=token, student=student)
    return JSONResponse(content=jsonable_encoder(result))


@app.post("/auth/login", response_model=schemas.TokenResponse)
@limiter.limit("10/minute")
def login(request: Request, payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.email == payload.email).first()
    if not student or not auth.verify_password(payload.password, student.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password.")
    token = auth.create_access_token(student.id)
    result = schemas.TokenResponse(access_token=token, student=student)
    return JSONResponse(content=jsonable_encoder(result))


@app.post("/auth/forgot-password")
@limiter.limit("3/hour")
def forgot_password(request: Request, payload: schemas.ForgotPasswordRequest,
                    background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.email == payload.email).first()
    if student:
        token = secrets.token_urlsafe(32)
        student.reset_token = auth.hash_reset_token(token)
        student.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=1)
        db.commit()
        reset_url = f"{FRONTEND_URL}/reset-password.html?token={token}"
        background_tasks.add_task(email_utils.send_password_reset_email, student.email, reset_url)
    return JSONResponse(content={"message": "If that email is registered, a reset link has been sent."})


@app.post("/auth/reset-password")
@limiter.limit("10/hour")
def reset_password(request: Request, payload: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(
        models.Student.reset_token == auth.hash_reset_token(payload.token)
    ).first()
    exp = student.reset_token_expires if student else None
    if exp is not None and exp.tzinfo is None:
        exp = exp.replace(tzinfo=timezone.utc)
    if not student or not exp or exp < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="This reset link is invalid or has expired.")
    student.hashed_password = auth.hash_password(payload.new_password)
    student.reset_token = None
    student.reset_token_expires = None
    student.tokens_valid_after = datetime.now(timezone.utc)
    db.commit()
    return {"message": "Password updated. You can now log in."}


@app.get("/progress", response_model=list[schemas.ProgressOut])
def get_progress(
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    return (
        db.query(models.Progress)
        .filter(models.Progress.student_id == current_student.id)
        .all()
    )


@app.post("/progress/{lesson_slug}", response_model=schemas.ProgressOut)
@limiter.limit("60/minute")
def mark_complete(
    request: Request,
    lesson_slug: str,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if lesson_slug not in {s for slugs in TRACK_LESSONS.values() for s in slugs}:
        raise HTTPException(status_code=404, detail="Unknown lesson.")

    if has_server_quiz(db, lesson_slug):
        raise HTTPException(status_code=403, detail="Pass this lesson's quiz to complete it.")
    
    existing = (
        db.query(models.Progress)
        .filter(
            models.Progress.student_id == current_student.id,
            models.Progress.lesson_slug == lesson_slug,
        )
        .first()
    )
    if existing:
        return existing

    entry = models.Progress(student_id=current_student.id, lesson_slug=lesson_slug)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

TRACK_LESSONS = {
    "beginner": ["what-is-forex", "pips-lots-spreads-margin", "risk-management-basics", "trading-psychology-basics", "choosing-a-broker"],
    "intermediate": ["support-resistance-and-zones", "trends-ranges-and-timeframes", "chart-patterns-and-fakeouts", "candlestick-confirmations", "moving-averages", "momentum-and-volatility-indicators", "fibonacci-and-market-structure", "trade-planning-essentials", "layered-risk-budgeting", "trading-plan-and-backtesting"],
    "advanced": ["smc-ict-foundations", "liquidity-crt-and-ranges", "irl-erl-and-fvg", "elliott-wave-and-market-cycles", "mt4-mt5-and-synthetic-indices", "cot-positioning"],
    "macro": ["macro-fundamentals-intro", "economic-calendar-mastery", "central-banks-and-rates", "top-down-trade-thesis"],
    "tradingview": ["tradingview-interface-tour", "tradingview-drawing-tools", "tradingview-indicators-and-strategies", "tradingview-alerts-and-watchlists", "tradingview-paper-and-live-trading"],
    "funded": ["how-funded-challenges-work", "challenge-rules-risk-plan", "pacing-a-challenge", "choosing-a-prop-firm"],
}

CORE_TRACKS = ["beginner", "intermediate", "advanced"]

@app.get("/certificates")
def get_certificates(
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    rows = db.query(models.Progress).filter(models.Progress.student_id == current_student.id).all()
    completed_map = {r.lesson_slug: r.completed_at for r in rows}

    results = []
    for track, slugs in TRACK_LESSONS.items():
        dates = [completed_map[s] for s in slugs if s in completed_map]
        earned = len(dates) == len(slugs)
        results.append({
            "track": track,
            "earned": earned,
            "completed_at": max(dates).isoformat() if earned else None,
            "progress": f"{len(dates)}/{len(slugs)}",
            "cert_id": make_cert_id(current_student.id, track) if earned else None,
        })

    core_slugs = [s for t in CORE_TRACKS for s in TRACK_LESSONS[t]]
    core_dates = [completed_map[s] for s in core_slugs if s in completed_map]
    master_earned = len(core_dates) == len(core_slugs)
    results.append({
        "track": "master",
        "earned": master_earned,
        "completed_at": max(core_dates).isoformat() if master_earned else None,
        "progress": f"{len(core_dates)}/{len(core_slugs)}",
        "cert_id": make_cert_id(current_student.id, "master") if master_earned else None,
    })
    return results

@app.get("/certificates/verify/{cert_id}")
@limiter.limit("30/minute")
def verify_certificate(request: Request, cert_id: str, db: Session = Depends(get_db)):
    parts = cert_id.strip().split("-")
    if len(parts) != 4 or parts[0] != "VA":
        raise HTTPException(status_code=404, detail="Certificate not found.")
    try:
        student_id = int(parts[1])
    except ValueError:
        raise HTTPException(status_code=404, detail="Certificate not found.")
    track = parts[2].lower()
    if track != "master" and track not in TRACK_LESSONS:
        raise HTTPException(status_code=404, detail="Certificate not found.")
    if not hmac.compare_digest(parts[3].upper(), cert_code(student_id, track)):
        raise HTTPException(status_code=404, detail="Certificate not found.")

    student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Certificate not found.")

    rows = db.query(models.Progress).filter(models.Progress.student_id == student.id).all()
    completed_map = {r.lesson_slug: r.completed_at for r in rows}

    if track == "master":
        slugs = [s for t in CORE_TRACKS for s in TRACK_LESSONS[t]]
    elif track in TRACK_LESSONS:
        slugs = TRACK_LESSONS[track]
    else:
        raise HTTPException(status_code=404, detail="Certificate not found.")

    dates = [completed_map[s] for s in slugs if s in completed_map]
    if len(dates) != len(slugs):
        raise HTTPException(status_code=404, detail="Certificate not found.")

    scores = best_scores(db, student.id, slugs)
    return {
        "valid": True,
        "student_name": student.certificate_name or student.name,
        "track": track,
        "completed_at": max(dates).isoformat(),
        "lesson_slugs": slugs,
        "assessed": len(scores),
        "avg_score": round(sum(scores.values()) / len(scores)) if scores else None,
    }


@app.get("/community/posts", response_model=schemas.PaginatedPosts)
def list_posts(category: str | None = None, page: int = Query(1, ge=1, le=500), db: Session = Depends(get_db)):
    PAGE_SIZE = 20
    query = db.query(models.Post)
    if category and category != "all":
        query = query.filter(models.Post.category == category)
    rows = (
        query.order_by(models.Post.created_at.desc())
        .offset((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE + 1)
        .all()
    )
    has_more = len(rows) > PAGE_SIZE
    rows = rows[:PAGE_SIZE]
    items = [
        {"id": p.id, "category": p.category, "title": p.title, "created_at": p.created_at,
         "student": p.student, "reply_count": len(p.replies)}
        for p in rows
    ]
    return {"items": items, "has_more": has_more}


@app.post("/community/posts", response_model=schemas.PostDetailOut)
@limiter.limit("10/minute")
def create_post(
    request: Request,
    payload: schemas.PostCreate,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    post = models.Post(
        student_id=current_student.id,
        category=payload.category,
        title=payload.title.strip()[:200],
        body=payload.body.strip()[:5000],
    )
    if not post.title or not post.body:
        raise HTTPException(status_code=400, detail="Title and body can't be empty.")

    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@app.get("/community/posts/{post_id}", response_model=schemas.PostDetailOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found.")
    return post


@app.post("/community/posts/{post_id}/replies", response_model=schemas.ReplyOut)
@limiter.limit("20/minute")
def create_reply(
    request: Request,
    post_id: int,
    payload: schemas.ReplyCreate,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found.")
    reply = models.Reply(
        post_id=post_id,
        student_id=current_student.id,
        body=payload.body.strip()[:2000],
    )
    db.add(reply)
    db.commit()
    db.refresh(reply)

    if post.student_id != current_student.id and post.student.notify_on_reply:
        post_url = f"{FRONTEND_URL}/community-post.html?id={post_id}"
        email_utils.send_reply_notification_email(post.student.email, post.title, post_url)

    return reply


@app.post("/community/posts/{post_id}/report")
@limiter.limit("5/minute")
def report_post(
    request: Request,
    post_id: int,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found.")
    post.is_reported = True
    db.commit()
    return {"message": "Post reported. Thank you."}


@app.delete("/community/posts/{post_id}")
@limiter.limit("10/minute")
def delete_post(
    request: Request,
    post_id: int,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found.")
    if post.student_id != current_student.id and not current_student.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post.")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted."}


@app.delete("/community/posts/{post_id}/replies/{reply_id}")
@limiter.limit("10/minute")
def delete_reply(
    request: Request,
    post_id: int,
    reply_id: int,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    reply = db.query(models.Reply).filter(models.Reply.id == reply_id, models.Reply.post_id == post_id).first()
    if not reply:
        raise HTTPException(status_code=404, detail="Reply not found.")
    if reply.student_id != current_student.id and not current_student.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this reply.")
    db.delete(reply)
    db.commit()
    return {"message": "Reply deleted."}


@app.get("/community/reports", response_model=list[schemas.PostListOut])
def list_reports(
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not current_student.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required.")
    posts = db.query(models.Post).filter(models.Post.is_reported.is_(True)).order_by(models.Post.created_at.desc()).all()
    return [
        {"id": p.id, "category": p.category, "title": p.title, "created_at": p.created_at,
         "student": p.student, "reply_count": len(p.replies)}
        for p in posts
    ]


@app.get("/me", response_model=schemas.StudentOut)
def get_me(current_student: models.Student = Depends(auth.get_current_student)):
    return current_student


@app.patch("/me", response_model=schemas.StudentOut)
def update_profile(
    request: Request,
    payload: schemas.UpdateProfileRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name can't be empty.")
    if payload.email != current_student.email:
        if not payload.current_password or not auth.verify_password(payload.current_password, current_student.hashed_password):
            raise HTTPException(status_code=400, detail="Enter your current password to change your email.")
    current_student.name = name[:100]
    current_student.certificate_name = ((payload.certificate_name or "").strip()[:100]) or None
    current_student.email = payload.email
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="That email is already in use.")
    db.refresh(current_student)
    return current_student


@app.get("/me/export")
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


@app.patch("/me/notifications", response_model=schemas.StudentOut)
def update_notifications(
    payload: schemas.UpdateNotificationsRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    current_student.notify_on_reply = payload.notify_on_reply
    db.commit()
    db.refresh(current_student)
    return current_student


def _wipe_student_data(db: Session, student: models.Student):
    for post in db.query(models.Post).filter(models.Post.student_id == student.id).all():
        db.delete(post)  # cascades to replies on this post, including other people's
    db.query(models.Reply).filter(models.Reply.student_id == student.id).delete()
    db.query(models.Progress).filter(models.Progress.student_id == student.id).delete()
    db.query(models.ChatMessage).filter(models.ChatMessage.student_id == student.id).delete()
    db.query(models.QuizAttempt).filter(models.QuizAttempt.student_id == student.id).delete()

@app.delete("/me/data")
@limiter.limit("5/hour")
def erase_my_data(
    request: Request,
    payload: schemas.DeleteAccountRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not auth.verify_password(payload.password, current_student.hashed_password):
        raise HTTPException(status_code=400, detail="Password is incorrect.")
    _wipe_student_data(db, current_student)
    current_student.certificate_name = None
    current_student.preferences = None
    db.commit()
    return {"message": "Your data has been erased."}


@app.delete("/me")
@limiter.limit("5/hour")
def delete_my_account(
    request: Request,
    payload: schemas.DeleteAccountRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not auth.verify_password(payload.password, current_student.hashed_password):
        raise HTTPException(status_code=400, detail="Password is incorrect.")
    _wipe_student_data(db, current_student)
    db.delete(current_student)
    db.commit()
    return {"message": "Account deleted."}


@app.post("/me/change-password")
def change_password(
    payload: schemas.ChangePasswordRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not auth.verify_password(payload.current_password, current_student.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    current_student.hashed_password = auth.hash_password(payload.new_password)
    current_student.tokens_valid_after = datetime.now(timezone.utc)
    db.commit()
    return {"message": "Password updated.", "access_token": auth.create_access_token(current_student.id)}


@app.get("/streak")
def get_streak(
    tz_offset: int = 0,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    # tz_offset = JS getTimezoneOffset() (minutes behind UTC; South Africa = -120)
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


@app.post("/chat/ticket")
def chat_ticket(current_student: models.Student = Depends(auth.get_current_student),):
    exp = datetime.utcnow() + timedelta(seconds=60)
    ticket = jwt.encode(
        {"sub": str(current_student.id), "purpose": "ws", "exp": exp},
        auth.SECRET_KEY, algorithm=auth.ALGORITHM,
    )
    return {"ticket": ticket}


@app.get("/chat/{room}/messages")
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


@app.delete("/chat/messages/{message_id}")
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


@app.websocket("/ws/chat/{room}")
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


# ---------- Admin: dismiss a report ----------
@app.post("/community/posts/{post_id}/dismiss-report")
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



@app.get("/admin/stats")
def get_admin_stats(
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not current_student.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required.")

    total_students = db.query(models.Student).count()
    total_completions = db.query(models.Progress).count()
    total_posts = db.query(models.Post).count()

    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_signups = db.query(models.Student).filter(models.Student.created_at >= thirty_days_ago).count()

    completion_counts_raw = dict(
        db.query(models.Progress.lesson_slug, func.count(models.Progress.id))
        .group_by(models.Progress.lesson_slug)
        .all()
    )
    lesson_completions = [
        {"slug": slug, "track": track, "title": slug, "completions": completion_counts_raw.get(slug, 0)}
        for track, slugs in TRACK_LESSONS.items()
        for slug in slugs
    ]

    return {
        "total_students": total_students,
        "total_completions": total_completions,
        "total_posts": total_posts,
        "recent_signups_30d": recent_signups,
        "lesson_completions": lesson_completions,
    } 