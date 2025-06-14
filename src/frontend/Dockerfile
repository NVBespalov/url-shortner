# Аргументы, которые можно переопределить при сборке
ARG NODE_VERSION
ARG NGINX_VERSION
ARG WORK_DIR
ARG NGINX_HTML_DIR

# Stage 1: Build environment
FROM node:${NODE_VERSION} AS builder

# Установка рабочей директории
WORKDIR ${WORK_DIR}

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Создание production сборки
RUN npm run build

# Stage 2: Production environment
FROM nginx:${NGINX_VERSION}

# Установка curl для healthcheck
RUN apk add --no-cache curl

# Копирование конфигурации nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Копирование конфигурации health-check
COPY nginx/health-check.conf /etc/nginx/conf.d/health-check.conf

# Копирование статических файлов из builder
ARG WORK_DIR
ARG NGINX_HTML_DIR
COPY --from=builder ${WORK_DIR}/build ${NGINX_HTML_DIR}

# Копирование скрипта для подстановки переменных окружения
COPY nginx/env.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/env.sh

# Добавление healthcheck с использованием переменной порта
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${FRONTEND_PORT}/health || exit 1


# Определение переменных окружения
ARG API_URL
ENV REACT_APP_API_URL=${API_URL}
ARG REACT_APP_GA_ID
ENV REACT_APP_GA_ID=${REACT_APP_GA_ID}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Указание порта
ARG FRONTEND_PORT
EXPOSE ${FRONTEND_PORT}

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]