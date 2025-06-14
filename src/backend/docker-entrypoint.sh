#!/bin/sh
set -e

# Функция для проверки доступности PostgreSQL
wait_for_postgres() {
    echo "Waiting for PostgreSQL to be ready..."

    while ! pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" \
        -U "$POSTGRES_USER" >/dev/null 2>&1; do
        echo "PostgreSQL is not ready - sleeping"
        sleep 2
    done

    echo "PostgreSQL is ready!"
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

# Проверка доступности PostgreSQL
if [ -n "$POSTGRES_HOST" ] && [ -n "$POSTGRES_PORT" ]; then
    wait_for_postgres
fi

# Проверка доступности Redis
if [ -n "$REDIS_HOST" ] && [ -n "$REDIS_PORT" ]; then
    wait_for_service "$REDIS_HOST" "$REDIS_PORT" "Redis"
fi

# Применение миграций PostgreSQL (если используются)
if [ "$NODE_ENV" = "production" ] && [ -n "$POSTGRES_MIGRATIONS_ENABLED" ]; then
    echo "Running PostgreSQL migrations..."
    npm run db:migrate:up
fi

# Запуск приложения
if [ "$NODE_ENV" = "development" ]; then
    echo "Starting application in development mode..."
    npm run start:dev
else
    echo "Starting application in production mode..."
    npm run start:prod
fi