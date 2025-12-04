# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

ARG REACT_APP_AUTH_URL
ARG REACT_APP_PRODUCT_URL
ARG REACT_APP_CART_URL
ARG REACT_APP_ORDER_URL
ARG REACT_APP_PAYMENT_URL

ENV REACT_APP_AUTH_URL=$REACT_APP_AUTH_URL
ENV REACT_APP_PRODUCT_URL=$REACT_APP_PRODUCT_URL
ENV REACT_APP_CART_URL=$REACT_APP_CART_URL
ENV REACT_APP_ORDER_URL=$REACT_APP_ORDER_URL
ENV REACT_APP_PAYMENT_URL=$REACT_APP_PAYMENT_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Nginx Server
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
