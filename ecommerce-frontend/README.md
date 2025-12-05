# M3 Shop - Ecommerce Frontend

![Frontend Screenshot](../screenshots/frontend-project.PNG)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Docker Usage](#docker-usage)
- [Helm Chart Deployment](#helm-chart-deployment)
- [Deployment](#deployment)
- [License](#license)

---

## Project Overview

This project is the **frontend** part of the M3 Shop ecommerce platform.  
It is built with **React** using **Vite** as the build tool, and styled with **Tailwind CSS** for a modern and responsive UI.  

The frontend communicates with backend microservices (authentication, product catalog, cart, order, payment) via RESTful APIs configured through environment variables.

---

## Features

- Responsive and mobile-friendly design
- Featured products display on the homepage
- Smooth navigation with React Router (`react-router-dom`)
- Environment-based API URLs for flexible deployment
- Dockerized for easy containerized deployments
- Production-ready Nginx setup for static file serving

---

## Tech Stack

- React 18
- Vite (Fast frontend tooling)
- Tailwind CSS (Utility-first CSS framework)
- Docker (Containerization)
- Nginx (Production static server)
- Helm (Kubernetes package manager)

---

## Project Structure

```
ecommerce-frontend/
├── Dockerfile # Multi-stage Docker build config
├── helm/ # Helm chart directory for Kubernetes deployment
│ ├── Chart.yaml # Helm chart metadata
│ ├── values.yaml # Default values for Helm chart
│ ├── templates/ # Kubernetes manifests templates
│ │ ├── deployment.yaml
│ │ ├── service.yaml
│ │ └── ingress.yaml (optional)
├── nginx.conf # Nginx server configuration for production
├── package.json # Node dependencies and scripts
├── postcss.config.cjs # PostCSS configuration for Tailwind CSS
├── public/ # Static public files
├── src/ # React source code
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js # Vite configuration
└── README.md # This documentation
````
----------------

---

## Environment Variables

The app expects the following environment variables to be provided at build time:

| Variable Name           | Description                       |
|------------------------|---------------------------------|
| `REACT_APP_AUTH_URL`    | Backend URL for Authentication API |
| `REACT_APP_PRODUCT_URL` | Backend URL for Product API       |
| `REACT_APP_CART_URL`    | Backend URL for Cart API          |
| `REACT_APP_ORDER_URL`   | Backend URL for Order API         |
| `REACT_APP_PAYMENT_URL` | Backend URL for Payment API       |

These variables are passed during Docker build or can be set locally via `.env` file.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mohamedanter845/ecommerce-microservices.git
   cd ecommerce-frontend

---------
Docker Usage

The Dockerfile uses a multi-stage build for efficiency:

Stage 1: Builder

Uses node:18-alpine image.

Copies source and installs dependencies.

Injects environment variables during build.

Runs the build script producing static files in /app/dist.

Stage 2: Production

Uses nginx:alpine lightweight image.

Copies built static files from the builder stage.

Uses custom Nginx configuration (nginx.conf).

Exposes port 80.
-----------------
Build Docker Image
```
docker build --build-arg REACT_APP_AUTH_URL=http://auth-service \
             --build-arg REACT_APP_PRODUCT_URL=http://product-service \
             --build-arg REACT_APP_CART_URL=http://cart-service \
             --build-arg REACT_APP_ORDER_URL=http://order-service \
             --build-arg REACT_APP_PAYMENT_URL=http://payment-service \
             -t m3shop-frontend .
````
----------------
Helm Chart Deployment

The helm/ directory contains the Helm chart used to deploy the frontend application on Kubernetes.

How to deploy using Helm

Make sure you have Helm
 installed and configured.

Navigate to the helm directory:
helm upgrade --install m3shop-frontend . --namespace ecommerce --create-namespace
------------
What the Helm chart does

Creates a Deployment resource running the frontend Docker image.

Creates a Service to expose the Deployment internally or externally.

Optionally manages Ingress resource for HTTP routing (if configured).

Supports configuration through values.yaml for replicas, resource limits, image, and environment variables.
--------------
Deployment

You can deploy this Docker image or the Helm chart to your Kubernetes cluster or any cloud platform that supports containers. The Helm chart provides an easy, repeatable way to deploy and upgrade your frontend app on Kubernetes.

