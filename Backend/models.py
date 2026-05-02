from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from database import engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String(100))

# Table create
Base.metadata.create_all(bind=engine)