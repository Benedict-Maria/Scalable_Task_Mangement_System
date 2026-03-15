from pydantic import BaseModel
from datetime import date, datetime


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class ForgotPassword(BaseModel):
    email: str


class ResetPassword(BaseModel):
    token: str
    new_password: str


class TaskCreate(BaseModel):
    title: str
    description: str
    priority: str
    due_date: date


class TaskResponse(BaseModel):

    id: int
    title: str
    description: str
    status: str
    priority: str
    due_date: date
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True