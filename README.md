# URL Shortener Service
![GitHub](https://img.shields.io/github/license/NVBespalov/url-shortner)
![GitHub last commit](https://img.shields.io/github/last-commit/NVBespalov/url-shortner)
![CI/CD](https://github.com/NVBespalov/url-shortner/workflows/CI/CD/badge.svg)
![Build Status](https://img.shields.io/github/actions/workflow/status/NVBespalov/url-shortner/ci.yml)
![Coverage](https://img.shields.io/codecov/c/github/NVBespalov/url-shortner)

Современный сервис для сокращения URL-адресов с открытым исходным кодом. Построен с использованием NestJS и React.

## ✨ Основные возможности

- 🚀 Мгновенное сокращение URL
- 📊 Аналитика переходов
- 🔒 Безопасность и приватные ссылки
- 📱 Адаптивный пользовательский интерфейс
- 🌍 Многоязычность
- ⚡ Высокая производительность
- 🔍 SEO-friendly

## 🛠 Технологический стек

### Backend
- [NestJS](https://nestjs.com/) - основной фреймворк
- [MongoDB](https://www.mongodb.com/) - база данных
- [Redis](https://redis.io/) - кэширование
- [TypeScript](https://www.typescriptlang.org/) - язык программирования
- [Jest](https://jestjs.io/) - тестирование

### Frontend
- [React](https://reactjs.org/) - UI фреймворк
- [TypeScript](https://www.typescriptlang.org/) - язык программирования
- [Material-UI](https://material-ui.com/) - компоненты интерфейса
- [Redux Toolkit](https://redux-toolkit.js.org/) - управление состоянием
- [React Testing Library](https://testing-library.com/react) - тестирование

### DevOps
- [Docker](https://www.docker.com/) - контейнеризация
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [Nginx](https://nginx.org/) - веб-сервер

## 📋 Требования

- Docker 24.x или выше
- Docker Compose v2.x или выше
- Make (опционально)

## 🚀 Быстрый старт

1. Клонируйте репозиторий:
```bash
git clone [https://github.com/username/url-shortner.git](https://github.com/username/url-shortner.git) cd url-shortner
```
2. Настройте переменные окружения:
```bash
# Backend
cd backend cp .env.example .env
# Frontend
cd frontend cp .env.example .env
```
3. Запустите приложение:
```bash
docker-compose up -d
```

Приложение будет доступно по адресу: http://localhost:80

## 📖 Документация

Подробная документация доступна в следующих разделах:

- [Руководство по развертыванию](./docs/deployment.md)
- [API Documentation](./docs/api.md)
- [Архитектура](./docs/architecture.md)
- [Руководство разработчика](./docs/development.md)

## 🧪 Тестирование

### Backend тесты
```bash
cd backend npm run test # unit tests npm run test:e2e # e2e tests npm run test:cov # test coverage
```

### Frontend тесты
```bash
cd frontend npm run test # unit tests npm run test:e2e # e2e tests
```

## 📊 Мониторинг

- Frontend: http://localhost:80/health
- Backend: http://localhost:3000/api/v1/health
- Метрики: http://localhost:3000/api/v1/metrics

## 🤝 Contributing

Мы приветствуем вклад в развитие проекта! Пожалуйста, ознакомьтесь с нашим [руководством по содействию](./docs/CONTRIBUTING.md).

1. Форкните репозиторий
2. Создайте ветку для вашей функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'feat: add amazing feature'`)
4. Отправьте изменения в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для подробностей.

## 👥 Авторы

- **Николай Беспалов** - *Начальная работа* - [https://github.com/NVBespalov](https://github.com/NVBespalov)

См. также список [контрибьюторов](https://github.com/NVBespalov/url-shortner/contributors).


## 📞 Поддержка

Если у вас возникли проблемы:

- Проверьте [FAQ](./docs/faq.md)
- Создайте [Issue](https://github.com/NVBespalov/url-shortner/issues)

## 🔗 Полезные ссылки

- [Дорожная карта](./docs/ROADMAP.md)
- [История изменений](./CHANGELOG.md)
- [Кодекс поведения](./docs/CODE_OF_CONDUCT.md)
- [Руководство по безопасности](./docs/SECURITY.md)

## 🌟 Показатели

## 🌟 Показатели

![GitHub Stars](https://img.shields.io/github/stars/NVBespalov/url-shortner)
![GitHub Forks](https://img.shields.io/github/forks/NVBespalov/url-shortner)
![GitHub Issues](https://img.shields.io/github/issues/NVBespalov/url-shortner)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/NVBespalov/url-shortner)