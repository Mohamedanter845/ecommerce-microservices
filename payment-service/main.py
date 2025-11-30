from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
import os
import datetime

app = FastAPI()

def get_db():
    return psycopg2.connect(
        host=os.getenv("ORDER_DB_HOST", "order-db"),
        database=os.getenv("ORDER_DB_NAME", "order_db"),
        user=os.getenv("ORDER_DB_USER", "order_user"),
        password=os.getenv("ORDER_DB_PASSWORD", "order_pass")
    )

class PaymentRequest(BaseModel):
    order_id: int
    amount: float

@app.post("/pay")
def pay(payment: PaymentRequest):
    conn = get_db()
    cur = conn.cursor()

    # 1) check order exists + get status + total_price
    cur.execute("SELECT status, total_price FROM orders WHERE id = %s", (payment.order_id,))
    row = cur.fetchone()
    if not row:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Order not found")

    status, total_price = row

    # 2) only allow paying pending orders
    if status != "pending":
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail=f"Order status is '{status}', cannot pay")

    # 3) validate amount
    # cast numeric to float for comparison
    try:
        expected = float(total_price)
    except Exception:
        expected = float(total_price or 0)

    if abs(expected - float(payment.amount)) > 0.0001:
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail=f"Incorrect payment amount (expected {expected})")

    # 4) mark order paid and record payment
    cur.execute("UPDATE orders SET status = %s, paid_at = %s WHERE id = %s",
                ("paid", datetime.datetime.utcnow(), payment.order_id))
    cur.execute(
        "INSERT INTO payments (order_id, amount, status, created_at) VALUES (%s, %s, %s, %s) RETURNING id",
        (payment.order_id, payment.amount, "success", datetime.datetime.utcnow())
    )
    payment_id = cur.fetchone()[0]

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Payment successful", "order_id": payment.order_id, "payment_id": payment_id}
