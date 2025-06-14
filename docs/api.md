# API Документация

## Endpoints

### URL Operations

#### Создание короткой ссылки
`POST /api/urls`

##### Запрос

```json
{ "originalUrl": "[https://example.com/very-long-url](https://example.com/very-long-url)", "expiresAt": "2025-12-31T23:59:59Z" }
```

##### Ответ

```json
{ "id": "60d3b41ef3f4d52b9c4c86f1", "shortUrl": "[http://domain.com/abc123](http://domain.com/abc123)", "originalUrl": "[https://example.com/very-long-url](https://example.com/very-long-url)", "createdAt": "2025-06-14T12:00:00Z", "expiresAt": "2025-12-31T23:59:59Z", "clicks": 0 }
```


#### Получение информации о ссылке
```REST
GET /api/urls/:shortCode
```

##### Ответ

```json
{ "id": "60d3b41ef3f4d52b9c4c86f1", "originalUrl": "[https://example.com/very-long-url](https://example.com/very-long-url)", "shortCode": "abc123", "clicks": 42, "createdAt": "2025-06-14T12:00:00Z" }
```


#### Получение списка ссылок пользователя
```REST
GET /api/urls
```

##### Параметры запроса
- page (default: 1)
- limit (default: 10)

##### Ответ
```json
{ "items": [{ "id": "60d3b41ef3f4d52b9c4c86f1", "originalUrl": "[https://example.com/very-long-url](https://example.com/very-long-url)", "shortCode": "abc123", "clicks": 42, "createdAt": "2025-06-14T12:00:00Z" }], "total": 42, "page": 1, "limit": 10 }
```


### Аутентификация

#### Регистрация
```REST
POST /api/auth/register
```

##### Запрос

```json
{ "email": "user@example.com", "password": "securePassword123" }
```

#### Вход
```REST
POST /api/auth/login
```

##### Запрос

```json
{ "email": "user@example.com", "password": "securePassword123" }
```

##### Ответ

```json
{ "access_token": "eyJhbGciOiJIUzI1NiIs...", "user": { "id": "60d3b41ef3f4d52b9c4c86f1", "email": "user@example.com" } }
```
