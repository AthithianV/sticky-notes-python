from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

class NoteBase(BaseModel):
    note_title: str
    note_content: str

class NoteCreate(NoteBase):
    pass

class NoteResponse(NoteBase):
    id: int
    owner_id: int