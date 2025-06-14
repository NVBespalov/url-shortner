#!/bin/sh
set -e

# Функция для проверки доступности MongoDB
wait_for_mongodb() {
    echo "Waiting for MongoDB to be ready..."

    while ! mongosh --host "$MONGO_HOST" --port "$MONGO_PORT" \
        ${MONGO_USER:+-u "$MONGO_USER"} \
        ${MONGO_PASSWORD:+-p "$MONGO_PASSWORD"} \
        --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
        echo "MongoDB is not ready - sleeping"
        sleep 2
    done

    echo "MongoDB is ready!"
}

# Функция для проверки доступности сервиса Redis
wait_for_service() {
    host="$1"
    port="$2"
    service_name="$3"

    echo "Waiting for $service_name to be ready..."

    while ! nc -z "$host" "$port"; do
        echo "$service_name is not ready - sleeping"
        sleep 1
    done

    echo "$service_name is ready!"
}

# Проверка доступности MongoDB
if [ -n "$MONGO_HOST" ] && [ -n "$MONGO_PORT" ]; then
    wait_for_mongodb
fi

# Проверка доступности Redis
if [ -n "$REDIS_HOST" ] && [ -n "$REDIS_PORT" ]; then
    wait_for_service "$REDIS_HOST" "$REDIS_PORT" "Redis"
fi

# Применение миграций MongoDB (если используются)
if [ "$NODE_ENV" = "production" ] && [ -n "$MONGO_MIGRATIONS_ENABLED" ]; then
    echo "Running MongoDB migrations..."
    npm run mongodb:migrate:up
fi

# Запуск приложения
if [ "$NODE_ENV" = "development" ]; then
    echo "Starting application in development mode..."
    npm run start:dev
else
    echo "Starting application in production mode..."
    npm run start:prod
fi