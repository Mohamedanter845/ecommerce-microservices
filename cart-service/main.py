from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
import os

app = FastAPI()

def get_db():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

class CartItem(BaseModel):
    user_id: str
    product_id: int
    quantity: int = 1

@app.post("/cart/add")
def add_to_cart(item: CartItem):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT quantity FROM carts WHERE user_id=%s AND product_id=%s",
        (item.user_id, item.product_id)
    )
    existing = cur.fetchone()

    if existing:
        new_quantity = existing[0] + item.quantity
        cur.execute(
            "UPDATE carts SET quantity=%s WHERE user_id=%s AND product_id=%s",
            (new_quantity, item.user_id, item.product_id)
        )
    else:
        cur.execute(
            "INSERT INTO carts (user_id, product_id, quantity) VALUES (%s, %s, %s)",
            (item.user_id, item.product_id, item.quantity)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Product added to cart"}

@app.get("/cart/{user_id}")
def get_cart(user_id: str):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT product_id, quantity FROM carts WHERE user_id=%s",
        (user_id,)
    )
    items = cur.fetchall()

    cur.close()
    conn.close()

    return [{"product_id": pid, "quantity": qty} for pid, qty in items]

@app.post("/cart/remove")
def remove_from_cart(item: CartItem):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM carts WHERE user_id=%s AND product_id=%s",
        (item.user_id, item.product_id)
    )

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Product removed from cart"}
