from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models
from ..schemas import TaskCreate, TaskResponse
from ..utils.token import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):

    new_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date,
        status="pending",
        owner_id=user.id   # corrected
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/")
def get_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):

    tasks = db.query(models.Task).filter(
        models.Task.owner_id == user.id   # corrected
    ).all()

    return tasks


@router.put("/{task_id}")
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):

    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user.id   # corrected
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task.title
    db_task.description = task.description
    db_task.priority = task.priority
    db_task.due_date = task.due_date

    db.commit()

    return {"message": "Task updated"}


@router.put("/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):

    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user.id   # corrected
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = "completed"

    db.commit()

    return {"message": "Task completed"}


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):

    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user.id   # corrected
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}