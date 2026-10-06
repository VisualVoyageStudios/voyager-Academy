from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func

import models
import schemas
import auth
from database import get_db

import os
import secrets
from datetime import datetime, timedelta
import email_utils

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
def forgot_password(request: Request, payload: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.email == payload.email).first()
    if student:
        token = secrets.token_urlsafe(32)
        student.reset_token = token
        student.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
        db.commit()
        reset_url = f"{FRONTEND_URL}/reset-password.html?token={token}"
        email_utils.send_password_reset_email(student.email, reset_url)
    return JSONResponse(content={"message": "If that email is registered, a reset link has been sent."})


@app.post("/auth/reset-password")
def reset_password(payload: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.reset_token == payload.token).first()
    if not student or not student.reset_token_expires or student.reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="This reset link is invalid or has expired.")
    student.hashed_password = auth.hash_password(payload.new_password)
    student.reset_token = None
    student.reset_token_expires = None
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
def mark_complete(
    lesson_slug: str,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
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


@app.get("/")
def health_check():
    return {"status": "Voyager Academy API is running"}


TRACK_LESSONS = {
    "beginner": ["what-is-forex", "risk-management-basics", "trading-psychology-basics"],
    "intermediate": ["support-resistance-and-zones", "chart-patterns-and-fakeouts", "candlestick-confirmations", "fibonacci-and-market-structure", "trade-planning-essentials"],
    "advanced": ["smc-ict-foundations", "liquidity-crt-and-ranges", "irl-erl-and-fvg", "elliott-wave-and-market-cycles", "mt4-mt5-and-synthetic-indices", "cot-positioning"],
    "macro": ["macro-fundamentals-intro", "economic-calendar-mastery", "central-banks-and-rates", "top-down-trade-thesis"],
    "tradingview": ["tradingview-interface-tour", "tradingview-drawing-tools", "tradingview-indicators-and-strategies", "tradingview-alerts-and-watchlists", "tradingview-paper-and-live-trading"],
}
CORE_TRACKS = ["beginner", "intermediate", "advanced"]  # unchanged — macro stays optional, same as TradingView


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
        })

    core_slugs = [s for t in CORE_TRACKS for s in TRACK_LESSONS[t]]
    core_dates = [completed_map[s] for s in core_slugs if s in completed_map]
    master_earned = len(core_dates) == len(core_slugs)
    results.append({
        "track": "master",
        "earned": master_earned,
        "completed_at": max(core_dates).isoformat() if master_earned else None,
        "progress": f"{len(core_dates)}/{len(core_slugs)}",
    })
    return results


@app.get("/community/posts", response_model=schemas.PaginatedPosts)
def list_posts(category: str | None = None, page: int = 1, db: Session = Depends(get_db)):
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
def create_post(
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
def create_reply(
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
    return reply


@app.post("/community/posts/{post_id}/report")
def report_post(
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
def delete_post(
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
def delete_reply(
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
    payload: schemas.UpdateProfileRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    current_student.name = payload.name
    current_student.email = payload.email
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="That email is already in use.")
    db.refresh(current_student)
    return current_student


@app.post("/me/change-password")
def change_password(
    payload: schemas.ChangePasswordRequest,
    current_student: models.Student = Depends(auth.get_current_student),
    db: Session = Depends(get_db),
):
    if not auth.verify_password(payload.current_password, current_student.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    current_student.hashed_password = auth.hash_password(payload.new_password)
    db.commit()
    return {"message": "Password updated."}


@app.get("/certificates/verify/{cert_id}")
def verify_certificate(cert_id: str, db: Session = Depends(get_db)):
    parts = cert_id.split("-")
    if len(parts) < 3 or parts[0] != "VA":
        raise HTTPException(status_code=404, detail="Certificate not found.")
    try:
        student_id = int(parts[1])
    except ValueError:
        raise HTTPException(status_code=404, detail="Certificate not found.")
    track = "-".join(parts[2:]).lower()

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

    return {
        "valid": True,
        "student_name": student.name,
        "track": track,
        "completed_at": max(dates).isoformat(),
    }


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