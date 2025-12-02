from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
import psycopg2
import os
import jwt
import datetime

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = "SECRET123"

MAX_BCRYPT_PASSWORD_BYTES = 72

def get_db():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

class User(BaseModel):
    username: str
    password: str

def truncate_password(password: str, max_bytes: int = MAX_BCRYPT_PASSWORD_BYTES) -> str:
    encoded = password.encode('utf-8')[:max_bytes]
    truncated = encoded.decode('utf-8', 'ignore')
    return truncated

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/register")
def register(user: User):
    raw_password = truncate_password(user.password)
    print(f"Password before hash (truncated): {raw_password} Length: {len(raw_password)}")

    conn = get_db()
    cur = conn.cursor()

    hashed_pass = pwd_context.hash(raw_password)

    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)",
                (user.username, hashed_pass))

    conn.commit()
    cur.close()
    conn.close()
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: User):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT password FROM users WHERE username=%s", (user.username,))
    result = cur.fetchone()

    if not result:
        raise HTTPException(status_code=400, detail="User not found")

    hashed_pass = result[0]

    raw_password = truncate_password(user.password)

    if not pwd_context.verify(raw_password, hashed_pass):
        raise HTTPException(status_code=400, detail="Incorrect password")

    token = jwt.encode(
        {
            "username": user.username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

    return {"access_token": token}
