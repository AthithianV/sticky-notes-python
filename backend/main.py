from fastapi import FastAPI
from app.routers.auth import auth_router
from app.routers.sticky_notes import notes_router
from app.data.database import engine
from app.data.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router)
app.include_router(notes_router)