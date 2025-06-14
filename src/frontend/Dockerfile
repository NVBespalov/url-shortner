# Аргументы, которые можно переопределить при сборке
ARG NODE_VERSION=22-alpine
ARG NGINX_VERSION=alpine
ARG REACT_APP_API_URL
ARG REACT_APP_GA_ID
ARG FRONTEND_PORT
# Stage 1: Build environment
ARG NODE_VERSION
FROM node:${NODE_VERSION} AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Создание production сборки
RUN npm run build

# Stage 2: Production environment
ARG NGINX_VERSION
FROM nginx:${NGINX_VERSION}

# Установка curl для healthcheck
RUN apk update && apk add --no-cache curl

# Копирование конфигурации nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Копирование конфигурации health-check
COPY nginx/health-check.conf /etc/nginx/conf.d/health-check.conf

# Копирование статических файлов из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование скрипта для подстановки переменных окружения
COPY nginx/env.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/env.sh

# Добавление healthcheck с использованием переменной порта
ARG FRONTEND_PORT
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${FRONTEND_PORT}/health || exit 1

EXPOSE ${FRONTEND_PORT}

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]