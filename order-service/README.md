# 🧾 Order Service – FastAPI Microservice

The **Order Service** handles creating new orders by retrieving cart items, fetching product details, calculating totals, and storing order data inside PostgreSQL.  
It communicates with **Cart Service** and **Product Service** inside the microservices architecture.

---

## 📸 Orders Page Screenshot
![Orders Page](../screenshots/orderspage-project.PNG)

---

## 🚀 Features
- Create orders for any user  
- Fetch cart items from **Cart Service**  
- Fetch product details from **Product Service**  
- Calculate total order price  
- Insert order + order items into PostgreSQL  
- REST API built using **FastAPI**  

---

## 🛠️ Tech Stack
- **FastAPI**
- **PostgreSQL**
- **psycopg2**
- **Requests**
- **Docker**
- **Kubernetes (Helm Chart included)**

---

## 📁 Project Structure
```
order-service/
│── main.py
│── Dockerfile
│── requirements.txt
│── README.md
└── helm/
```
------
✔ Response (Success)
```
{
  "message": "Order created successfully",
  "order_id": 12,
  "total_price": 350.0
}
```
-----
🐳 Run with Docker
```
docker build -t order-service .
docker run -p 8003:8003 order-service
````
-----
☸️ Deploy on Kubernetes (Helm)

Helm chart available inside:
```
✔ Install
helm install order-service ./helm
```
-----
🔗 Microservices Communication

Cart Service: http://cart-service:8002/cart/{user_id}

Product Service: http://product-service:8001/products/{product_id}
---------------
👨‍💻 Author

Developed by Mohamed Anter
GitHub: github.com/Mohamedanter845
