#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Запуск контейнера
docker run -d \
  --name frontend \
  -e FRONTEND_PORT="${FRONTEND_PORT}" \
  -e REACT_APP_API_URL=${REACT_APP_API_URL} \
  -p "${FRONTEND_PORT}":"${FRONTEND_PORT}" \
  frontend:latest