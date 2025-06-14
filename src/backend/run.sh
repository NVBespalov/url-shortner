#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Запуск контейнера
docker run -d \
  --name backend \
  --network app-network \
  -p ${BACKEND_PORT}:${BACKEND_PORT} \
  -e NODE_ENV=${NODE_ENV} \
  -e PORT=${BACKEND_PORT} \
  -e DB_HOST=${DB_HOST} \
  -e DB_PORT=${DB_PORT} \
  -e DB_NAME=${DB_NAME} \
  -e DB_USER=${DB_USER} \
  -e DB_PASSWORD=${DB_PASSWORD} \
  -e REDIS_HOST=${REDIS_HOST} \
  -e REDIS_PORT=${REDIS_PORT} \
  -e JWT_SECRET=${JWT_SECRET} \
  -e JWT_EXPIRES_IN=${JWT_EXPIRES_IN} \
  -e LOG_LEVEL=${LOG_LEVEL} \
  -e API_PREFIX=${API_PREFIX} \
  -e API_VERSION=${API_VERSION} \
  -e RATE_LIMIT_TTL=${RATE_LIMIT_TTL} \
  -e RATE_LIMIT_MAX=${RATE_LIMIT_MAX} \
  backend:latest