#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Запуск контейнера
docker run -d \
  --name frontend \
  -p ${FRONTEND_PORT}:${FRONTEND_PORT} \
  -e REACT_APP_API_URL=${API_URL} \
  frontend:latest