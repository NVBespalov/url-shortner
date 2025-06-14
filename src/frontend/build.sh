#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Сборка Docker образа с переменными
docker build \
  --build-arg NODE_VERSION=${NODE_VERSION} \
  --build-arg NGINX_VERSION=${NGINX_VERSION} \
  --build-arg WORK_DIR=${WORK_DIR} \
  --build-arg NGINX_HTML_DIR=${NGINX_HTML_DIR} \
  --build-arg API_URL=${API_URL} \
  --build-arg FRONTEND_PORT=${FRONTEND_PORT} \
  -t frontend:latest .