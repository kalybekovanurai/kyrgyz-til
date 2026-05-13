# Kyrgyztil.kg

Веб-портал кыргызского языка с frontend, backend API, Swagger и простой админ-панелью.

## Запуск

```bash
npm install
npm run dev
```

Frontend будет доступен по адресу:

```text
http://127.0.0.1:3000
```

Backend запускается отдельно:

```bash
npm run dev:api
```

API:

```text
http://127.0.0.1:4000/api
```

Swagger:

```text
http://127.0.0.1:4000/docs
```

Админ-панель:

```text
http://127.0.0.1:3000/admin
```

Локальный admin token:

```text
admin123
```

## Что есть в backend

- `GET /api/news`, `POST /api/news`, `PUT /api/news/:id`, `DELETE /api/news/:id`
- `GET /api/newspapers`, `POST /api/newspapers`, `PUT /api/newspapers/:id`, `DELETE /api/newspapers/:id`
- `GET /api/media`, `POST /api/media`, `PUT /api/media/:id`, `DELETE /api/media/:id`
- `POST /api/uploads` для загрузки PDF, изображений, аудио и видео
- `GET /docs` Swagger UI

Данные хранятся в `server/data`, файлы загружаются в `server/uploads`.
