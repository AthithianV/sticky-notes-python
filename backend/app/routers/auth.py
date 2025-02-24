from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.data.models import User
from app.data.schemas import UserCreate, UserLogin
from app.data.database import get_db
import jwt
from passlib.context import CryptContext

SECRET_KEY = "cbcbbe155c979c4b710039f51cc39bbd01025d763c8e8fc821bcfb142ad0bff8"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


auth_router = APIRouter()

@auth_router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    hashed_password = pwd_context.hash(user.password)
    db_user = User(user_name=user.username, user_email=user.email, password=hashed_password)
    db.add(db_user)

    db.commit()
    db.refresh(db_user)
    return {"msg": "User registered successfully"}

@auth_router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.user_name == user.username).first()

    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = jwt.encode({"user_id": db_user.user_id}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token}
