from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import crud, schemas
from database import SessionLocal
import models

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

     

# CREATE
@app.post("/users")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

# READ
@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

# UPDATE
@app.put("/users/{id}")
def update_user(id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.update_user(db, id, user)

# DELETE
@app.delete("/users/{id}")
def delete_user(id: int, db: Session= Depends(get_db)):
    return crud.delete_user(db, id)