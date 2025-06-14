#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Сборка Docker образа с переменными
docker build \
  --build-arg FRONTEND_PORT=${FRONTEND_PORT} \
  --build-arg REACT_APP_API_URL=${REACT_APP_API_URL} \
  --build-arg REACT_APP_GA_ID=${REACT_APP_GA_ID} \
  -t frontend:latest .