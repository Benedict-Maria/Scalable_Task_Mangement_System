from sqlalchemy.orm import Session
from ..models import User
from ..utils.hashing import hash_password, verify_password


def create_user(db: Session, user):

    hashed_password = hash_password(user.password)

    db_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def authenticate_user(db: Session, email: str, password: str):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user