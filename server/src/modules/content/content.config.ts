export type CollectionName = 'news' | 'newspapers' | 'media' | 'lessons';

export type FieldMap = Record<string, string>;

export type CollectionConfig = {
  table: string;
  prefix: string;
  fields: FieldMap;
};

export const contentCollections: Record<CollectionName, CollectionConfig> = {
  news: {
    table: 'news',
    prefix: 'news',
    fields: {
      title: 'title',
      titleRu: 'title_ru',
      date: 'date',
      category: 'category',
      image: 'image',
      content: 'content',
      contentRu: 'content_ru',
    },
  },
  newspapers: {
    table: 'newspapers',
    prefix: 'issue',
    fields: {
      number: 'number',
      title: 'title',
      date: 'date',
      pdfUrl: 'pdf_url',
    },
  },
  media: {
    table: 'media',
    prefix: 'media',
    fields: {
      type: 'type',
      title: 'title',
      titleRu: 'title_ru',
      guest: 'guest',
      guestRu: 'guest_ru',
      description: 'description',
      descriptionRu: 'description_ru',
      date: 'date',
      url: 'url',
      thumbnail: 'thumbnail',
    },
  },
  lessons: {
    table: 'lessons',
    prefix: 'lesson',
    fields: {
      type: 'type',
      title: 'title',
      titleRu: 'title_ru',
      content: 'content',
      contentRu: 'content_ru',
      videoUrl: 'video_url',
    },
  },
};

export function getCollectionConfig(collection: string) {
  const config = contentCollections[collection as CollectionName];
  if (!config) throw new Error(`Unknown collection: ${collection}`);
  return config;
}
