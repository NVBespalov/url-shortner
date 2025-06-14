# Руководство по развертыванию

## Требования
- Node.js 18.x или выше
- MongoDB 6.x
- Redis (для кэширования)
- npm или yarn

## Установка

### Backend (NestJS)
1. Клонировать репозиторий
```bash
git clone [git@github.com:NVBespalov/url-shortner.git](git@github.com:NVBespalov/url-shortner.git)
cd url-shortner/backend
````

3. Установить зависимости
```bash
npm install
````

3. Настройка переменных окружения
```bash
cp .env.example .env
````

Необходимые переменные окружения:

# Основные настройки
env
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortner
REDIS_URI=redis://localhost:6379
# JWT
JWT_SECRET=your-secret-key JWT_EXPIRES_IN=7d
# URL настройки
BASE_URL=[http://localhost:3000](http://localhost:3000)
```
### Frontend (React)
1. Перейти в директорию frontend
```bash
cd ../frontend
````
2. Установить зависимости
```bash
npm install
````
3. Настройка переменных окружения
```bash
cp .env.example .env
```
env
```
REACT_APP_API_URL=[http://localhost:3000/api](http://localhost:3000/api)
```
## Запуск для разработки

### Backend

# Режим разработки
```bash
npm run start:dev
````
# Режим отслеживания
```bash
npm run start:debug
```
### Frontend
```bash
npm start
````
## Сборка для production

### Backend

```bash
npm run build
````

### Frontend

```bash
npm run build
````

## Запуск с помощью Docker

### Вариант 1: Запуск каждого сервиса отдельно

Backend:

```bash
cd backend chmod +x build.sh run.sh docker-entrypoint.sh ./build.sh ./run.sh
````

Frontend:

```bash
cd frontend
docker build \
  --build-arg FRONTEND_PORT=${FRONTEND_PORT} \
  --build-arg REACT_APP_API_URL=${REACT_APP_API_URL} \
  --build-arg REACT_APP_GA_ID=${REACT_APP_GA_ID} \
  -t frontend:latest .
docker network create frontend-network
docker run -d
--name frontend
--network frontend-network
-e FRONTEND_PORT={FRONTEND_PORT}
-e REACT_APP_API_URL={REACT_APP_API_URL}
-p {FRONTEND_PORT}:{FRONTEND_PORT}
frontend:latest
```

### Вариант 2: Docker Compose (рекомендуется)

1. Сборка и запуск с Docker Compose
```bash
docker compose -f docker.compose.yml -p url-shortner up -d frontend
```
Это развернет:
- Backend сервис
- Frontend сервис
- MongoDB
- Redis

2. Остановка:
```bash
docker-compose down
```


## Мониторинг и логи

Проверка статуса сервисов:
```bash
docker-compose ps
```

Просмотр логов:
```bash
# Все сервисы
docker-compose logs -f
# Конкретный сервис
docker-compose logs -f backend docker-compose logs -f frontend
```

## Healthcheck
- Frontend: http://localhost:${FRONTEND_PORT}/health
- Backend: http://localhost:${BACKEND_PORT}/api/${API_VERSION}/health

## CI/CD
Проект настроен для использования GitHub Actions:
- Автоматическое тестирование при push
- Автоматическое развертывание в staging при merge в develop
- Автоматическое развертывание в production при создании release

