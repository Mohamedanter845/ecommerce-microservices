#!/bin/bash

AWS_REGION="eu-north-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

SERVICES=(
  "ecommerce-frontend"
  "product-service"
  "order-service"
  "payment-service"
  "cart-service"
  "auth-service"
)

echo "🚀 Starting Docker Build & Push Process"

echo "🔑 Logging into AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

for service in "${SERVICES[@]}"; do
    echo "📦 Building and pushing $service..."

    docker build -t $service ./$service

    IMAGE_TAG="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$service:latest"
    docker tag $service:latest $IMAGE_TAG

    docker push $IMAGE_TAG
done

echo "🎉 All images built and pushed successfully!"
