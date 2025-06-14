#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Сборка Docker образа
docker build \
  --build-arg NODE_ENV=${NODE_ENV} \
  --build-arg BACKEND_PORT=${BACKEND_PORT} \
  -t backend:latest .

  docker build --build-arg NODE_ENV=development --build-arg BACKEND_PORT=3000 -t backend:latest .