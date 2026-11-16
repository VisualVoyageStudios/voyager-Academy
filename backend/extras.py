import time
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
import jwt
from jwt import InvalidTokenError as JWTError
from sqlalchemy.orm import Session
from starlette.concurrency import run_in_threadpool

import auth
import models
import json
from pydantic import BaseModel
from database import SessionLocal, get_db

router = APIRouter()

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


# ---------- Synced preferences + sign out everywhere ----------
ALLOWED_PREF_KEYS = {
    "accent", "text", "font", "width", "density", "reduceMotion", "contrast", "links",
    "showStreak", "weeklyGoal", "reviewLength", "shuffleQuiz", "chatRoom",
    "calcBalance", "calcRisk", "theme", "lineHeight", "showExtras", "showReadbar", "hideDone", "showBadges", "chatSound", "calcStop",
}


class PreferencesPayload(BaseModel):
    preferences: dict


@router.get("/me/preferences")
def get_preferences(current_student: models.Student = Depends(auth.get_current_student)):
    try:
        prefs = json.loads(current_student.preferences or "{}")
    except Exception:
        prefs = {}
    return {"preferences": prefs}


@router.put("/me/preferences")
def put_preferences(
    payload: PreferencesPayload,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    clean = {}
    for k, v in payload.preferences.items():
        if k in ALLOWED_PREF_KEYS and isinstance(v, (str, bool, int, float)):
            if not isinstance(v, str) or len(v) <= 40:
                clean[k] = v
    current_student.preferences = json.dumps(clean)
    db.commit()
    return {"preferences": clean}


@router.post("/me/logout-everywhere")
def logout_everywhere(
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    current_student.tokens_valid_after = datetime.now(timezone.utc)
    db.commit()
    return {"access_token": auth.create_access_token(current_student.id)}

