from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..utils.token import get_current_user
from .. import models

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me")
def get_profile(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):

    tasks = db.query(models.Task).filter(models.Task.owner_id == current_user.id).all()  

    return {
        "username": current_user.username,
        "email": current_user.email,
        "tasks": tasks
    }