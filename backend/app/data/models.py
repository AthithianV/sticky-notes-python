from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import date

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(25), unique=True, index=True, nullable=False)
    user_email = Column(String(25), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)
    last_update = Column(Date, nullable=True)
    created_on = Column(Date, nullable=False, default=date.today)

    notes = relationship("Note", back_populates="user", cascade="all, delete-orphan")

class Note(Base):
    __tablename__ = 'notes'
    note_id = Column(Integer, primary_key=True, index=True)
    note_title = Column(String(25), nullable=False)
    note_content = Column(String(1000), nullable=True)
    color = Column(String(6), default="000000")
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    user = relationship("User", back_populates="notes")
    last_update = Column(Date, nullable=True)
    created_on = Column(Date, nullable=False, default=date.today)
