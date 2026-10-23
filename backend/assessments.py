import math
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

import auth
import models
from database import get_db

router = APIRouter(prefix="/quiz")

PASS_RATIO = 0.7            # same pass mark as quiz.html
MIN_SECONDS_PER_Q = 3       # blocks scripted instant submissions
MAX_ATTEMPTS_PER_HOUR = 20


def _keys(db: Session, slug: str) -> list[int]:
    rows = db.query(models.QuizKey).filter(models.QuizKey.lesson_slug == slug).order_by(models.QuizKey.q_index).all()
    return [r.correct for r in rows]


def has_server_quiz(db: Session, slug: str) -> bool:
    return db.query(models.QuizKey.id).filter(models.QuizKey.lesson_slug == slug).first() is not None


def best_scores(db: Session, student_id: int, slugs: list[str]) -> dict[str, int]:
    """Best passed score (%) per lesson, for lessons that have a server-graded quiz."""
    rows = db.query(models.QuizAttempt).filter(
        models.QuizAttempt.student_id == student_id,
        models.QuizAttempt.passed.is_(True),
        models.QuizAttempt.lesson_slug.in_(slugs),
    ).all()
    best: dict[str, int] = {}
    for r in rows:
        if r.total:
            pct = round(r.score / r.total * 100)
            best[r.lesson_slug] = max(best.get(r.lesson_slug, 0), pct)
    return best


@router.post("/{slug}/start")
def start_attempt(slug: str, student: models.Student = Depends(auth.get_current_student), db: Session = Depends(get_db)):
    keys = _keys(db, slug)
    if not keys:
        raise HTTPException(status_code=404, detail="No server-graded quiz for this lesson.")
    cutoff = datetime.now(timezone.utc) - timedelta(hours=1)
    recent = db.query(models.QuizAttempt).filter(
        models.QuizAttempt.student_id == student.id, models.QuizAttempt.started_at >= cutoff
    ).count()
    if recent >= MAX_ATTEMPTS_PER_HOUR:
        raise HTTPException(status_code=429, detail="Too many quiz attempts. Please try again later.")
    attempt = models.QuizAttempt(student_id=student.id, lesson_slug=slug)
    db.add(attempt)
    db.commit()
    db.refresh(attempt)
    return {"attempt_id": attempt.id, "total": len(keys)}


class SubmitIn(BaseModel):
    attempt_id: int
    answers: list[int]


@router.post("/{slug}/submit")
def submit_attempt(slug: str, payload: SubmitIn, student: models.Student = Depends(auth.get_current_student),
                   db: Session = Depends(get_db)):
    attempt = db.query(models.QuizAttempt).filter(
        models.QuizAttempt.id == payload.attempt_id,
        models.QuizAttempt.student_id == student.id,
        models.QuizAttempt.lesson_slug == slug,
    ).first()
    if not attempt or attempt.finished_at is not None:
        raise HTTPException(status_code=400, detail="Invalid or already-submitted attempt.")
    keys = _keys(db, slug)
    if len(payload.answers) != len(keys):
        raise HTTPException(status_code=400, detail="Wrong number of answers.")

    started = attempt.started_at
    if started.tzinfo is None:
        started = started.replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)
    if (now - started).total_seconds() < MIN_SECONDS_PER_Q * len(keys):
        raise HTTPException(status_code=400, detail="That was too fast. Take your time reading each question.")

    correct = [a == k for a, k in zip(payload.answers, keys)]
    score, total = sum(correct), len(keys)
    need = math.ceil(PASS_RATIO * total - 1e-9)
    passed = score >= need
    attempt.finished_at, attempt.score, attempt.total, attempt.passed = now, score, total, passed

    if passed:
        exists = db.query(models.Progress).filter(
            models.Progress.student_id == student.id, models.Progress.lesson_slug == slug
        ).first()
        if not exists:
            db.add(models.Progress(student_id=student.id, lesson_slug=slug))
    db.commit()
    return {"score": score, "total": total, "passed": passed, "pass_mark": need, "correct": correct}