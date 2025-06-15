Архитектура проекта

## Общий обзор
URL-сокращатель построен с использованием современного стека технологий:
- Backend: NestJS (Node.js фреймворк)
- Frontend: React
- База данных: PostgreSQL
- Кэширование: Redis

## Компоненты

### Backend (NestJS)
1. Модули
    - UrlModule - основной модуль для работы с URL
    - AuthModule - модуль аутентификации
    - StatisticsModule - модуль для сбора статистики

2. Сервисы
    - UrlService - логика работы с URL
    - AuthService - управление аутентификацией
    - StatisticsService - сбор и анализ статистики

3. Контроллеры
    - UrlController - API эндпоинты для работы с URL
    - AuthController - эндпоинты аутентификации
    - StatisticsController - эндпоинты статистики

### Frontend (React)
1. Компоненты
    - UrlShortener - главный компонент сокращения
    - UrlList - список сокращенных URL
    - Analytics - компонент статистики
    - Auth - компоненты авторизации

2. Состояние
    - Redux для управления состоянием
    - Redux Toolkit для упрощения работы с Redux

## Схема базы данных

### Коллекция URLs
```typescript
interface Url { _id: ObjectId; originalUrl: string; shortCode: string; userId?: ObjectId; createdAt: Date; expiresAt?: Date; clicks: number; }
```


### Коллекция Users
```typescript
interface User { _id: ObjectId; email: string; password: string; urls: ObjectId[]; createdAt: Date; }
```

## Диаграмма взаимодействия компонентов

[React Frontend] <-> [NestJS API] <-> [MongoDB] ^ ^ | | v v [Redux Store] [Redis Cache]

