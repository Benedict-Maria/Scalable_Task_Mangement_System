from sqlalchemy import Column,Integer,String,Text,Boolean,DateTime,Date,ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50))
    email = Column(String(100), unique=True)
    password_hash = Column(String(255))
    reset_token = Column(String(255))
    reset_token_expiry = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    tasks = relationship("Task", back_populates="owner")


class Task(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    description = Column(Text)
    status = Column(String(20), default="pending")
    priority = Column(String(20))
    due_date = Column(Date)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="tasks")
    activities = relationship("TaskActivity", back_populates="task")


class TaskActivity(Base):

    __tablename__ = "task_activities"

    id = Column(Integer, primary_key=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    action = Column(String(50))
    timestamp = Column(DateTime, default=datetime.utcnow)
    task = relationship("Task", back_populates="activities")