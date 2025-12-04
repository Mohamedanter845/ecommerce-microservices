# Auth Service

This microservice handles user authentication for the Ecommerce Microservices project. It provides endpoints for user registration, login, and health check.

---

## Features

- User registration with password hashing (bcrypt)  
- User login with JWT token generation  
- Database integration with PostgreSQL  
- Password length truncation to support bcrypt limits  
- Simple health check endpoint

---

## Tech Stack

- Python 3.9+  
- FastAPI  
- psycopg2 (PostgreSQL client)  
- passlib (for password hashing)  
- PyJWT (for JWT token handling)  

---

## Environment Variables

Make sure to set the following environment variables for database connection:

| Variable  | Description                   |
|-----------|-------------------------------|
| `DB_HOST` | Hostname or IP of PostgreSQL  |
| `DB_NAME` | Database name                 |
| `DB_USER` | Database user                 |
| `DB_PASSWORD` | Database user password     |

---

## Installation

1. Clone the repository and navigate to the `auth-service` directory:

```bash
git clone https://github.com/Mohamedanter845/ecommerce-microservices.git
cd ecommerce-microservices/auth-service
