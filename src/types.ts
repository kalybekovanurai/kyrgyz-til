export enum NewsCategory {
  EVENTS = 'events',
  LAWS = 'laws',
  PROJECTS = 'projects',
  EDUCATION = 'education',
  MEDIA_NEWS = 'media_news',
}

export interface NewsItem {
  id: string;
  title: string;
  titleRu?: string;
  date: string;
  category: NewsCategory;
  image: string;
  content: string;
  contentRu?: string;
}

export interface NewspaperIssue {
  id: string;
  number: string;
  title?: string;
  date: string;
  pdfUrl: string;
}

export interface MediaItem {
  id: string;
  type: 'podcast' | 'video' | 'survey';
  category?: string;
  title: string;
  titleRu?: string;
  guest?: string;
  guestRu?: string;
  description: string;
  descriptionRu?: string;
  date: string;
  url: string;
  thumbnail: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleRu?: string;
  type: 'text' | 'video' | 'test';
  content?: string;
  contentRu?: string;
  videoUrl?: string;
}
