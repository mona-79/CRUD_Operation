from sqlalchemy.orm import Session
from models import User

def create_user(db: Session, user):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def update_user(db: Session, id: int, user):
    db_user = db.query(User).filter(User.id == id).first()
    if not db_user:
        return {"error": " User not found"}
    
    db_user.name = user.name
    db_user.email = user.email
    db.commit()
    return db_user

def delete_user(db: Session, id: int):
    db_user = db.query(User).filter(User.id == id).first()
    if not db_user:
        return {"error": "User not found"}
    db.delete(db_user)
    db.commit()
    return{"message": "deleted"}
  