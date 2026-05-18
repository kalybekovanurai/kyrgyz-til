# Kyrgyz Tili Web Portal

Веб-портал кыргызского языка с публичным сайтом, админ-панелью, backend API, PostgreSQL, Swagger-документацией и Firebase Hosting.

## Что реализовано

- Главная страница, новости, газета, учебный центр, медиа, подкасты, видео-опросы, языковая политика, партнеры, о проекте и контакты.
- Двухъязычный интерфейс: кыргызский и русский языки.
- Админ-панель на `/admin` для управления контентом.
- CRUD для новостей, газет, медиа и уроков.
- Загрузка файлов, включая PDF, изображения, аудио и видео.
- Рабочие формы подписки и обратной связи.
- YouTube embed-player для видео и отдельный audio-player для подкастов.
- PostgreSQL для серверных данных.
- Firebase Hosting и Firestore-синхронизация для hosted-версии.
- Swagger UI для проверки API.

## Стек

Frontend:

- React 19
- TypeScript
- Vite
- Redux Toolkit
- Axios
- React Router
- Tailwind CSS
- Lucide React

Backend:

- Node.js
- Express
- TypeScript
- PostgreSQL
- Multer
- Swagger UI

Hosting:

- Firebase Hosting
- Firebase Firestore

## Структура проекта

```txt
src/
  components/        # переиспользуемые UI и секции страниц
  context/           # React context, например LanguageContext
  features/          # крупные frontend-фичи: admin, auth, forms
  lib/               # api clients, helpers, media utils
  modules/           # redux-модули: slice, thunk, types
  pages/             # route pages
  routes/            # маршрутизация приложения
  store/             # redux store
  translations/      # ky.ts, ru.ts и типы переводов

server/
  index.ts
  sql/               # SQL-схема
  src/
    app.ts
    main.ts
    config/          # env-настройки
    db/              # PostgreSQL pool, schema, seed data
    docs/            # Swagger/OpenAPI
    middlewares/     # error handler, admin guard
    modules/         # backend-модули: auth, content, forms, uploads
    shared/          # общие backend helpers
  uploads/           # загруженные файлы

scripts/
  syncServerContent.ts
  syncHostedContent.ts
  uploadDataClient.ts
```

## Установка

```bash
npm install
```

Создайте `.env` на основе `.env.example`.

```env
API_PORT=4000
ADMIN_PASSWORD="change-me"
ADMIN_TOKEN="replace-with-long-random-token"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kyrgyztil"

VITE_API_URL="http://localhost:4000"
VITE_ADMIN_TOKEN="change-me"
```

Важно: настоящий `.env` нельзя коммитить в GitHub, потому что там хранятся пароли и токены.

## Запуск локально

Backend:

```bash
npm run dev:api
```

Frontend:

```bash
npm run dev
```

Адреса:

- Frontend: `http://127.0.0.1:3000`
- Backend API: `http://127.0.0.1:4000/api`
- Swagger: `http://127.0.0.1:4000/docs`
- Admin panel: `http://127.0.0.1:3000/admin`

Можно запустить frontend и backend вместе:

```bash
npm run dev:all
```

## PostgreSQL

Проект использует PostgreSQL как основную серверную базу данных.

При старте backend:

- создаются нужные таблицы;
- добавляются начальные данные, если таблицы пустые;
- API начинает отдавать данные frontend-приложению.

Основные таблицы:

- `news`
- `newspapers`
- `media`
- `lessons`
- `subscriptions`
- `contact_messages`

Файлы загружаются в `server/uploads`, а в PostgreSQL сохраняется ссылка на файл.

## Swagger

Swagger доступен по адресу:

```txt
http://127.0.0.1:4000/docs
```

Через Swagger можно смотреть и тестировать endpoints API без Postman.

Основные endpoints:

- `POST /api/auth/login`
- `GET /api/news`
- `POST /api/news`
- `PUT /api/news/:id`
- `DELETE /api/news/:id`
- `GET /api/newspapers`
- `POST /api/newspapers`
- `GET /api/media`
- `POST /api/media`
- `GET /api/lessons`
- `POST /api/lessons`
- `POST /api/uploads`
- `POST /api/forms/subscriptions`
- `POST /api/forms/contact-messages`

## Админ-панель

Админ-панель находится по адресу:

```txt
/admin
```

В ней можно:

- добавлять и редактировать новости;
- добавлять газеты и PDF;
- добавлять видео, подкасты и медиа;
- добавлять уроки;
- загружать файлы;
- менять данные, которые отображаются на сайте.

Для защиты используется admin token/password из `.env`. В реальном production-проекте лучше подключить полноценную авторизацию: JWT, refresh tokens, роли пользователей и хранение токенов в httpOnly cookies.

## Firebase Hosting

Production-сборка:

```bash
npm run build
```

Деплой на Firebase Hosting:

```bash
npx firebase deploy --only hosting
```

Hosted-версия может брать данные из Firestore. Для синхронизации контента есть scripts:

```bash
npm run sync:hosting
npm run sync:server
```

## Проверка проекта

TypeScript-проверка:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

## Возможные названия второго коммита

Лучший вариант:

```txt
feat: add backend, admin panel and content management
```

Другие хорошие варианты:

```txt
feat: implement full-stack portal with admin dashboard
feat: connect frontend to API and add admin content editor
feat: add PostgreSQL backend, Swagger docs and Firebase hosting flow
```

Если коммит включает еще и рефакторинг архитектуры:

```txt
feat: add backend, admin panel and clean project architecture
```
