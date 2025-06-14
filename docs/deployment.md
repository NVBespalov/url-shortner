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
cd url-shortener/backend
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
MONGODB_URI=mongodb://localhost:27017/url-shortener
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

## Docker развертывание
Проект включает Docker-конфигурацию для простого развертывания.

1. Сборка и запуск с Docker Compose
```bash
docker-compose up -d
```

Это развернет:
- Backend сервис
- Frontend сервис
- MongoDB
- Redis

## CI/CD
Проект настроен для использования GitHub Actions:
- Автоматическое тестирование при push
- Автоматическое развертывание в staging при merge в develop
- Автоматическое развертывание в production при создании release
