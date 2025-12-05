# Notification Service

This microservice handles user notifications for the Ecommerce Microservices project.  
It allows creating notifications for users and fetching notifications by user ID.

---

## Features

- Create a notification for a user  
- Retrieve all notifications for a specific user  

---

## Tech Stack

- Python 3.9+  
- FastAPI  
- Pydantic  

---

## API Endpoints

### Create Notification

**POST** `/notifications`  
Create a new notification.

Request body example:

```json
{
  "user_id": "user123",
  "message": "Your order has been shipped"
}


--
Running the Service
Locally with Uvicorn
```
uvicorn main:app --host 0.0.0.0 --port 8006 --reload
```
----
Using Docker Compose

This service is included in the project’s root docker-compose.yml which orchestrates all microservices.

To start all services, including notification-service, run:

```
docker-compose up -d
```

Kubernetes Deployment with Helm

There is a Helm chart available in the helm/notification-service directory.

helm install notification-service ./helm/notification-service
-----------
Made with ❤️ by Mohamed Anter
