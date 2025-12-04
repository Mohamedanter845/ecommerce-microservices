# Cart Service

This microservice manages the shopping cart functionality for the Ecommerce Microservices project. It allows adding products to a user's cart, retrieving the cart contents, and removing products from the cart.

---

## Features

- Add product to user's cart (with quantity update if product exists)  
- Get all products in a user's cart  
- Remove product from user's cart  
- Health check endpoint

---

## Tech Stack

- Python 3.9+  
- FastAPI  
- psycopg2 (PostgreSQL client)  

---

## Environment Variables

Make sure to set the following environment variables for database connection:

| Variable    | Description                   |
|-------------|-------------------------------|
| `DB_HOST`   | Hostname or IP of PostgreSQL  |
| `DB_NAME`   | Database name                 |
| `DB_USER`   | Database user                 |
| `DB_PASSWORD` | Database user password     |

---

## Installation

1. Clone the repository and navigate to the `cart-service` directory:

```bash
git clone https://github.com/YourUsername/ecommerce-microservices.git
cd ecommerce-microservices/cart-service

-----------

Running the Service

Start the FastAPI application with Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```
------------
API Endpoints
Health Check

GET /health
Returns the health status of the service.
````
{
  "status": "ok"
}
```
----------
Add Product to Cart

POST /cart/add
Adds a product to the user's cart or updates the quantity if the product already exists.

Request Body:
````
{
  "user_id": "user123",
  "product_id": 1,
  "quantity": 2
}
```
----------
Database Schema (example)
````
CREATE TABLE carts (
  user_id VARCHAR(255) NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (user_id, product_id)
);
````
------
Helm Chart

A Helm chart is available in the helm directory for Kubernetes deployment.



Made with ❤️ by Mohamed Anter
