import re
from typing import Literal
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime

from pydantic import BaseModel, EmailStr
from datetime import datetime


NAME_RE = re.compile(r"^[^<>&\"`\x00-\x1f]{1,100}$")

def _clean_name(v: str) -> str:
    v = v.strip()
    if not NAME_RE.match(v):
        raise ValueError("Names can't be empty or contain < > & \" or `")
    return v

def _check_password(v: str) -> str:
    if len(v) < 8:
        raise ValueError("Password must be at least 8 characters")
    if len(v.encode("utf-8")) > 72:
        raise ValueError("Password is too long (72 bytes max)")
    return v


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    _n = field_validator("name")(lambda cls, v: _clean_name(v))
    _p = field_validator("password")(lambda cls, v: _check_password(v))


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str
    _p = field_validator("new_password")(lambda cls, v: _check_password(v))
    

class UpdateProfileRequest(BaseModel):
    name: str
    email: EmailStr
    current_password: str | None = None
    certificate_name: str | None = None
    _n = field_validator("name")(lambda cls, v: _clean_name(v))

    @field_validator("certificate_name")
    @classmethod
    def _cert_name(cls, v):
        return _clean_name(v) if v and v.strip() else None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    _p = field_validator("new_password")(lambda cls, v: _check_password(v))

class DeleteAccountRequest(BaseModel):
    password: str

class StudentOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool = False
    notify_on_reply: bool = True
    created_at: datetime
    certificate_name: str | None = None

    class Config:
        from_attributes = True


class UpdateNotificationsRequest(BaseModel):
    notify_on_reply: bool


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    student: StudentOut


class ProgressOut(BaseModel):
    lesson_slug: str
    completed_at: datetime

    class Config:
        from_attributes = True


class PostCreate(BaseModel):
    category: Literal["general", "beginner-questions", "trade-setups",
                      "tradingview-help", "wins-lessons"]
    title: str
    body: str


class ReplyCreate(BaseModel):
    body: str


class AuthorOut(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class ReplyOut(BaseModel):
    id: int
    body: str
    created_at: datetime
    student: AuthorOut

    class Config:
        from_attributes = True


class PostListOut(BaseModel):
    id: int
    category: Literal["general", "beginner-questions", "trade-setups", "tradingview-help", "wins-lessons"]
    title: str
    created_at: datetime
    student: AuthorOut
    reply_count: int

    class Config:
        from_attributes = True


class PaginatedPosts(BaseModel):
    items: list[PostListOut]
    has_more: bool


class PostDetailOut(BaseModel):
    id: int
    category: Literal["general", "beginner-questions", "trade-setups", "tradingview-help", "wins-lessons"]
    title: str
    body: str
    created_at: datetime
    student: AuthorOut
    replies: list[ReplyOut]

    class Config:
        from_attributes = True