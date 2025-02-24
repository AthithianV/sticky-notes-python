from fastapi import APIRouter, Depends, HTTPException, Header
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from app.data.models import Note
from app.data.schemas import NoteCreate, NoteResponse
from app.data.database import get_db
import jwt


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

notes_router = APIRouter()

@notes_router.post("/notes")
def create_note(note: NoteCreate, db: Session = Depends(get_db), token: str = Header(None)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    db_note = Note(**note.dict(), user_id=payload["user_id"])
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@notes_router.get("/notes")
def get_notes(db: Session = Depends(get_db), token: str = Header()):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    notes = db.query(Note).filter(Note.user_id == payload["user_id"]).all()
    return notes

@notes_router.put("/notes/{note_id}")
def update_note(note_id: int, note: NoteCreate, db: Session = Depends(get_db), token: str = Header(None)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    db_note = db.query(Note).filter(Note.note_id == note_id, Note.user_id == payload["user_id"]).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db_note.note_title = note.note_title
    db_note.note_content = note.note_content
    db.commit()
    db.refresh(db_note)
    return db_note

@notes_router.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db), token: str = Header()):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    db_note = db.query(Note).filter(Note.note_id == note_id, Note.user_id == payload["user_id"]).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return {"msg": "Note deleted"}