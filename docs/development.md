# уководство разработчика
## 📋 Требования к системе
- Node.js 18.x или выше
- NPM 9.x или выше
- Docker 24.x или выше
- MongoDB 6.x или выше
- Redis 7.x или выше
- Минимум 4GB RAM
- 2GB свободного места на диске

## 🚀 Настройка окружения разработки
### 1. Клонирование репозитория
```shell
git clone https://github.com/NVBespalov/url-shortner.git
cd url-shortner
```

### 2. Установка зависимостей
#### Backend
```shell 
cd src/backend
npm install
```

```shell
cd ./src/frontend
npm install
```

### 3. Настройка переменных окружения
#### Backend
```shell
cd ./src/backend
cp .env.example .env

```

Необходимые переменные окружения:
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortener
REDIS_URI=redis://localhost:6379
JWT_SECRET=your_jwt_secret
API_PREFIX=/api/v1

#### Frontend
```shell
cd ./src/frontend
cp .env.example .env
REACT_APP_API_URL=http://localhost:3000/api/v1
REACT_APP_GA_ID=your_google_analytics_id

```

## 💻 Запуск приложения
### Режим разработки
#### Backend
```shell
cd ./src/backend
npm run start:dev

```

### Docker-окружение
```shell
docker-compose -f docker-compose.dev.yml up -d
```
## 🧪 Тестирование
### Backend
```shell
# Unit тесты
npm run test

# E2E тесты
npm run test:e2e

# Проверка покрытия
npm run test:coverage
```

### Frontend
# Unit тесты
npm run test

# E2E тесты (Cypress)
npm run test:e2e

# Проверка покрытия
npm run test:coverage

## 🔍 Линтинг и форматирование
```shell
# Проверка линтером
npm run lint

# Автоматическое исправление
npm run lint:fix

# Форматирование кода
npm run format
```

## 📦 Сборка проекта
### Backend
```shell
cd backend
npm run build
```

### Frontend
```shell
cd frontend
npm run build
```

## 🔄 Git-процесс
### Ветвление
- `main` - основная ветка
- `develop` - ветка разработки
- - новый функционал `feature/*`
- - исправления `bugfix/*`
- - срочные исправления `hotfix/*`
- - подготовка релиза `release/*`

### Именование коммитов
Используйте [Conventional Commits](https://www.conventionalcommits.org/):
```shell
<тип>[область]: описание

# Примеры:
feat(auth): добавлена oauth2 аутентификация
fix(api): исправлен баг в валидации URL
docs(readme): обновлена документация по установке
```
## 📚 API Документация
### Генерация документации
```shell
cd backend
npm run doc:generate
```

Swagger UI доступен по адресу: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
## 🔍 Отладка
### Backend
- Используйте VS Code с расширением Node.js debugger
- Конфигурация отладки доступна в `.vscode/launch.json`

### Frontend
- Используйте React Developer Tools
- Redux DevTools для отладки состояния

## 📊 Мониторинг
### Эндпоинты мониторинга
- `/health` - статус сервиса
- `/metrics` - метрики Prometheus
- `/api/v1/status` - детальная информация о состоянии

## 🔒 Безопасность
### Проверки безопасности
```shell
# Проверка зависимостей
npm audit

# Сканирование уязвимостей
npm run security:check
```

## 📈 Производительность
### Профилирование
```shell
# Backend профилирование
npm run profile

# Frontend анализ бандла
npm run analyze
```

## 🚀 CI/CD
GitHub Actions используется для:
- Проверки кода
- Запуска тестов
- Сборки Docker образов
- Развертывания

## 📝 Логирование
- Используйте Winston для backend логирования
- Sentry для отслеживания ошибок
- Структурированное логирование в JSON формате

## ❗ Решение проблем
### Частые проблемы
1. **Ошибка подключения к MongoDB**
    - Проверьте статус сервиса MongoDB
    - Проверьте правильность URI

2. **Ошибки сборки Frontend**
    - Очистите кэш npm: `npm cache clean --force`
    - Удалите node_modules и установите заново

3. **Проблемы с Docker**
    - Проверьте логи: `docker-compose logs`
    - Перезапустите Docker daemon

## 🆘 Поддержка
- GitHub Issues для баг-репортов
- Discussions для вопросов
- Pull Requests для контрибуции
