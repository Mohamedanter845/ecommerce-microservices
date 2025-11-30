from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

class Product(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "product_db")
DB_USER = os.getenv("DB_USER", "product_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "product_pass")

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

@app.on_event("startup")
def startup():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL
    )
    """)
    conn.commit()
    cur.close()
    conn.close()

@app.post("/products", status_code=201)
def create_product(product: Product):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id FROM products WHERE id = %s", (product.id,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Product ID already exists")
        cur.execute(
            "INSERT INTO products (id, name, description, price) VALUES (%s, %s, %s, %s)",
            (product.id, product.name, product.description, product.price)
        )
        conn.commit()
        return product
    finally:
        cur.close()
        conn.close()

@app.get("/products", response_model=List[Product])
def list_products():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM products")
    products = cur.fetchall()
    cur.close()
    conn.close()
    return products

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
    product = cur.fetchone()
    cur.close()
    conn.close()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.delete("/products/{product_id}", status_code=204)
def delete_product(product_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
    conn.commit()
    cur.close()
    conn.close()
