from sqlalchemy.orm import Session
from ..models import Task


def create_task(db: Session, task, user_id):

    db_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date,
        status="pending",      
        owner_id=user_id
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


def get_tasks(db: Session, user_id):

    return db.query(Task).filter(
        Task.owner_id == user_id
    ).all()