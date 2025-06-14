#!/bin/bash

# Загрузка переменных окружения
set -a
source .env
set +a

# Сборка Docker образа
docker build \
  --build-arg NODE_VERSION=${NODE_VERSION} \
  --build-arg WORK_DIR=${WORK_DIR} \
  --build-arg NODE_ENV=${NODE_ENV} \
  --build-arg BACKEND_PORT=${BACKEND_PORT} \
  -t backend:latest .