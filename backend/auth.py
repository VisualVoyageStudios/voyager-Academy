import os, secrets, hashlib
import bcrypt
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
import models

SECRET_KEY = os.getenv("JWT_SECRET", "")
if len(SECRET_KEY) < 32:
    raise RuntimeError("JWT_SECRET must be set to a random value of 32+ characters")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 weeks

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:          # bcrypt 5 raises on passwords over 72 bytes
        return False

def hash_reset_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()

def create_access_token(student_id: int) -> str:
    now = datetime.utcnow()
    expire = now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": str(student_id), "iat": now, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)


def get_current_student(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> models.Student:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        student_id = payload.get("sub")
        if student_id is None or payload.get("purpose"):
            raise credentials_error
    except JWTError:
        raise credentials_error

    student = db.query(models.Student).filter(models.Student.id == int(student_id)).first()
    if student is None:
        raise credentials_error
    if student.tokens_valid_after is not None:
        if int(payload.get("iat", 0)) < int(student.tokens_valid_after.timestamp()):
            raise credentials_error
    return student



