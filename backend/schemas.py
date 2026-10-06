from pydantic import BaseModel, EmailStr
from datetime import datetime


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class UpdateProfileRequest(BaseModel):
    name: str
    email: EmailStr


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class StudentOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool = False

    class Config:
        from_attributes = True


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
    category: str
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
    category: str
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
    category: str
    title: str
    body: str
    created_at: datetime
    student: AuthorOut
    replies: list[ReplyOut]

    class Config:
        from_attributes = True