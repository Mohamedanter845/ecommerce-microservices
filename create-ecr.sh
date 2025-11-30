#!/bin/bash

# ---------- CONFIG ----------
AWS_REGION="eu-north-1"
SERVICES=(
  "ecommerce-frontend"
  "product-service"
  "order-service"
  "payment-service"
  "cart-service"
  "auth-service"
)
# ----------------------------

echo "🚀 Starting ECR Repositories Creation in region: $AWS_REGION"
echo "-------------------------------------------------------------"

for service in "${SERVICES[@]}"; do
    echo "📦 Creating ECR Repository: $service ..."

    aws ecr create-repository \
        --repository-name "$service" \
        --region "$AWS_REGION" \
        >/dev/null 2>&1

    if [ $? -eq 0 ]; then
        echo "✅ Created: $service"
    else
        echo "⚠️ Repository $service already exists or error occurred"
    fi
done

echo "-------------------------------------------------------------"
echo "🎉 Done! All repositories processed."
echo "💡 Run: aws ecr describe-repositories --region $AWS_REGION"
