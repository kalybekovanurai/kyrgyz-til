const crudPath = (tag: string, schema: string) => ({
  get: { tags: [tag], summary: `List ${tag.toLowerCase()}`, responses: { '200': { description: 'List' } } },
  post: {
    tags: [tag],
    security: [{ AdminToken: [] }],
    summary: `Create ${tag.toLowerCase()} item`,
    requestBody: { required: true, content: { 'application/json': { schema: { $ref: `#/components/schemas/${schema}` } } } },
    responses: { '201': { description: 'Created' } },
  },
});

const crudItemPath = (tag: string, schema: string) => ({
  get: {
    tags: [tag],
    summary: `Get ${tag.toLowerCase()} item`,
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
    responses: { '200': { description: 'Item' }, '404': { description: 'Not found' } },
  },
  put: {
    tags: [tag],
    security: [{ AdminToken: [] }],
    summary: `Update ${tag.toLowerCase()} item`,
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
    requestBody: { required: true, content: { 'application/json': { schema: { $ref: `#/components/schemas/${schema}` } } } },
    responses: { '200': { description: 'Updated' } },
  },
  delete: {
    tags: [tag],
    security: [{ AdminToken: [] }],
    summary: `Delete ${tag.toLowerCase()} item`,
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
    responses: { '204': { description: 'Deleted' } },
  },
});

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Kyrgyztil.kg API',
    version: '1.0.0',
    description: 'Backend API for news, newspaper issues, media, lessons, auth and file uploads.',
  },
  servers: [{ url: 'http://localhost:4000', description: 'Local API' }],
  components: {
    securitySchemes: {
      AdminToken: { type: 'apiKey', in: 'header', name: 'x-admin-token' },
    },
    schemas: {
      Login: {
        type: 'object',
        required: ['password'],
        properties: { password: { type: 'string', example: 'admin123' } },
      },
      News: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          titleRu: { type: 'string' },
          date: { type: 'string', example: '2026-05-10' },
          category: { type: 'string', enum: ['events', 'laws', 'projects', 'education', 'media_news'] },
          image: { type: 'string' },
          content: { type: 'string' },
          contentRu: { type: 'string' },
        },
      },
      Newspaper: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          number: { type: 'string', example: '№15 (450)' },
          title: { type: 'string' },
          date: { type: 'string', example: '2026-05-01' },
          pdfUrl: { type: 'string' },
        },
      },
      Media: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['podcast', 'survey', 'video'] },
          category: { type: 'string', enum: ['tech', 'history', 'culture', 'education'] },
          title: { type: 'string' },
          titleRu: { type: 'string' },
          guest: { type: 'string' },
          guestRu: { type: 'string' },
          description: { type: 'string' },
          descriptionRu: { type: 'string' },
          date: { type: 'string', example: '2026-05-05' },
          url: { type: 'string' },
          thumbnail: { type: 'string' },
        },
      },
      Lesson: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'text' },
          type: { type: 'string', enum: ['text', 'video', 'test'] },
          title: { type: 'string' },
          titleRu: { type: 'string' },
          content: { type: 'string' },
          contentRu: { type: 'string' },
          videoUrl: { type: 'string' },
        },
      },
      UploadResponse: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          filename: { type: 'string' },
          originalName: { type: 'string' },
          mimetype: { type: 'string' },
          size: { type: 'number' },
        },
      },
      Subscription: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', example: 'example@mail.com' },
          source: { type: 'string', example: 'home_subscription' },
        },
      },
      ContactMessage: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', example: 'example@mail.com' },
          message: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/api/health': {
      get: { tags: ['System'], summary: 'Health check', responses: { '200': { description: 'API is running' } } },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login as admin',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Login' } } } },
        responses: { '200': { description: 'Returns admin token' }, '401': { description: 'Invalid password' } },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        security: [{ AdminToken: [] }],
        summary: 'Validate admin token',
        responses: { '200': { description: 'Admin session is valid' }, '401': { description: 'Invalid token' } },
      },
    },
    '/api/news': crudPath('News', 'News'),
    '/api/news/{id}': crudItemPath('News', 'News'),
    '/api/newspapers': crudPath('Newspapers', 'Newspaper'),
    '/api/newspapers/{id}': crudItemPath('Newspapers', 'Newspaper'),
    '/api/media': crudPath('Media', 'Media'),
    '/api/media/{id}': crudItemPath('Media', 'Media'),
    '/api/lessons': crudPath('Lessons', 'Lesson'),
    '/api/lessons/{id}': crudItemPath('Lessons', 'Lesson'),
    '/api/uploads': {
      post: {
        tags: ['Uploads'],
        security: [{ AdminToken: [] }],
        summary: 'Upload image, pdf, audio or video file',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
            },
          },
        },
        responses: { '201': { description: 'Uploaded' } },
      },
    },
    '/api/forms/subscriptions': {
      post: {
        tags: ['Forms'],
        summary: 'Create newspaper subscription request',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Subscription' } } } },
        responses: { '201': { description: 'Subscription saved' }, '400': { description: 'Invalid payload' } },
      },
    },
    '/api/forms/contact-messages': {
      post: {
        tags: ['Forms'],
        summary: 'Create contact message',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactMessage' } } } },
        responses: { '201': { description: 'Message saved' }, '400': { description: 'Invalid payload' } },
      },
    },
  },
};
