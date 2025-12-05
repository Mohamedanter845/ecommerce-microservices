# Payment Service

This microservice handles payment processing for orders in the Ecommerce Microservices project.  
It verifies orders, validates payment amounts, updates order status, and records payments.

---

## Features

- Validate if an order exists and its status  
- Accept payment only for pending orders  
- Validate payment amount matches order total  
- Update order status to "paid"  
- Record successful payment transactions  

---

## Tech Stack

- Python 3.10+  
- FastAPI  
- psycopg2 (PostgreSQL client)  

---

## Environment Variables

| Variable         | Description                                | Default        |
|------------------|--------------------------------------------|----------------|
| `ORDER_DB_HOST`    | Hostname or IP of the Orders PostgreSQL DB | `order-db`      |
| `ORDER_DB_NAME`    | Database name for orders                     | `order_db`      |
| `ORDER_DB_USER`    | Database user                               | `order_user`    |
| `ORDER_DB_PASSWORD`| Database user password                      | `order_pass`    |

---

## API Endpoints

### POST `/pay`

Process a payment for an order.

**Request Body:**

```json
{
  "order_id": 123,
  "amount": 199.99
}


-------
Behavior:

Checks if the order exists and its current status.

Allows payment only if order status is "pending".

Validates the payment amount matches the order total.

Updates order status to "paid".

Records the payment in the payments table.
````
{
  "message": "Payment successful",
  "order_id": 123,
  "payment_id": 456
}
```
----------
Database Schema (Partial)
-- orders table should have at least these columns:
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  paid_at TIMESTAMP NULL
);

-- payments table stores payment transactions:
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL
);
----------------
Docker Compose

This service can be run alongside others using the project’s root docker-compose.yml.
To build and run only the payment service:
````
docker-compose up -d --build payment-service
```
-------------
Kubernetes & Helm

A Helm chart is available in the helm/payment-service directory for Kubernetes deployment.

Install the Service

````
helm install payment-service ./helm/payment-service
```
--------
Author

Made with ❤️ by Mohamed Anter
