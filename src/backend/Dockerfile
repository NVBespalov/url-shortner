# BUILD FOR LOCAL DEVELOPMENT ===================
FROM node:22-alpine AS development

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Создание директории приложения
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Создание production build
RUN npm run build

# BUILD FOR PRODUCTION ===================
FROM node:22-alpine AS build

WORKDIR /app
# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка только production зависимостей
RUN npm ci --only=production

# Копирование собранного приложения
COPY --from=development /app/dist ./dist

# PRODUCTION ===================
FROM node:22-alpine AS production

# Добавление пользователя node_user для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Установка dumb-init для корректной обработки сигналов
RUN apk add --no-cache dumb-init

# Создание директории приложения и установка прав
RUN mkdir -p /app && chown -R nestjs:nodejs /app

# Копирование собранного приложения и зависимостей
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --chown=nestjs:nodejs package*.json ./

# Копирование скриптов и конфигураций
COPY --chown=nestjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Переключение на непривилегированного пользователя
USER nestjs

# Определение переменных окружения
ARG NODE_ENV
ARG BACKEND_PORT
# Проверка работоспособности приложения
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${BACKEND_PORT}/api/${API_VERSION}/health || exit 1

# Определение порта
ARG BACKEND_PORT
EXPOSE ${BACKEND_PORT}

# Запуск приложения через dumb-init для корректной обработки сигналов
ENTRYPOINT ["dumb-init", "--"]
CMD ["./docker-entrypoint.sh"]
#CMD node dist/main.js
