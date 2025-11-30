from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
import requests
from datetime import datetime

app = FastAPI()

DB_CONFIG = {
    "dbname": "order_db",
    "user": "order_user",
    "password": "order_password",
    "host": "order-db",
    "port": 5432
}

class OrderRequest(BaseModel):
    user_id: str

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def fetch_cart(user_id: str):
    try:
        response = requests.get(f"http://cart-service:8002/cart/{user_id}")
        response.raise_for_status()
        return response.json()
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch cart")

def fetch_product(product_id: int):
    try:
        response = requests.get(f"http://product-service:8001/products/{product_id}")
        response.raise_for_status()
        return response.json()
    except Exception:
        raise HTTPException(status_code=500, detail=f"Failed to fetch product {product_id}")

@app.post("/orders")
def create_order(order: OrderRequest):
    user_id = order.user_id

    # Get cart
    cart_items = fetch_cart(user_id)
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_price = 0
    order_items_to_insert = []

    # Calculate total price
    for item in cart_items:
        product = fetch_product(item["product_id"])
        item_total = product["price"] * item["quantity"]
        total_price += item_total
        order_items_to_insert.append((item["product_id"], item["quantity"], product["price"]))

    conn = get_db_connection()
    cur = conn.cursor()

    # Insert order
    cur.execute(
        "INSERT INTO orders (user_id, total_price, status, created_at) VALUES (%s, %s, %s, %s) RETURNING id",
        (user_id, total_price, "pending", datetime.utcnow())
    )
    order_id = cur.fetchone()[0]

    # Insert order items
    for product_id, qty, price in order_items_to_insert:
        cur.execute(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (%s, %s, %s, %s)",
            (order_id, product_id, qty, price)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Order created successfully", "order_id": order_id, "total_price": total_price}
