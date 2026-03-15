from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import UserCreate, UserLogin
from ..crud import user_crud
from ..utils.token import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    return user_crud.create_user(db, user)


@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):

    user = user_crud.authenticate_user(
        db,
        data.email,
        data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }