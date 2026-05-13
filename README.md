# Kyrgyztil.kg

Веб-портал кыргызского языка с React frontend, Express backend, PostgreSQL, Swagger и админ-панелью.

## Запуск

Установить зависимости:

```bash
npm install
```

Создать `.env` по примеру `.env.example` и указать PostgreSQL:

```env
API_PORT=4000
ADMIN_PASSWORD="admin123"
ADMIN_TOKEN="replace-with-long-random-token"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kyrgyztil"
```

Запустить backend:

```bash
npm run dev:api
```

При старте сервер сам создаст таблицы PostgreSQL и добавит временные данные, если таблицы пустые.

Запустить frontend:

```bash
npm run dev
```

Frontend: `http://127.0.0.1:3000`

Backend API: `http://127.0.0.1:4000/api`

Swagger: `http://127.0.0.1:4000/docs`

Админ-панель: `http://127.0.0.1:3000/admin`

## Backend Architecture

Backend разложен в production-style структуру:

```txt
server/
  index.ts
  sql/
    schema.sql
  src/
    app.ts
    main.ts
    config/
      env.ts
    db/
      pool.ts
      schema.ts
      seed.ts
    docs/
      openapi.ts
    middlewares/
      errorHandler.ts
      requireAdmin.ts
    modules/
      auth/
        auth.routes.ts
      content/
        content.config.ts
        content.repository.ts
        content.routes.ts
      health/
        health.routes.ts
      lessons/
        lessons.routes.ts
      media/
        media.routes.ts
      news/
        news.routes.ts
      newspapers/
        newspapers.routes.ts
      uploads/
        uploads.routes.ts
    shared/
      entity.ts
  uploads/
```

Смысл слоев:

- `config` читает env-настройки.
- `db` отвечает за PostgreSQL, создание таблиц и seed.
- `modules` содержит бизнес-модули и HTTP routes.
- `repository` работает с PostgreSQL.
- `middlewares` содержит общие проверки, например защиту админки.
- `docs` хранит Swagger/OpenAPI описание.
- `shared` хранит общие типы и helpers.

## API

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/news`, `POST /api/news`, `PUT /api/news/:id`, `DELETE /api/news/:id`
- `GET /api/newspapers`, `POST /api/newspapers`, `PUT /api/newspapers/:id`, `DELETE /api/newspapers/:id`
- `GET /api/media`, `POST /api/media`, `PUT /api/media/:id`, `DELETE /api/media/:id`
- `GET /api/lessons`, `POST /api/lessons`, `PUT /api/lessons/:id`, `DELETE /api/lessons/:id`
- `POST /api/uploads`

## PostgreSQL

Данные хранятся в таблицах PostgreSQL:

- `news`
- `newspapers`
- `media`
- `lessons`

Файлы, например PDF и изображения, хранятся в `server/uploads`, а в PostgreSQL сохраняется ссылка на файл.
