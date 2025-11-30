from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

notifications = []

class Notification(BaseModel):
    user_id: str
    message: str

@app.post("/notifications")
def create_notification(notification: Notification):
    notifications.append(notification)
    return {"message": "Notification created successfully"}

@app.get("/notifications/{user_id}", response_model=List[Notification])
def get_notifications(user_id: str):
    return [n for n in notifications if n.user_id == user_id]
