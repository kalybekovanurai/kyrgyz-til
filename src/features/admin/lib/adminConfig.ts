import type React from 'react';
import { BookOpen, FileUp, Newspaper, Radio } from 'lucide-react';
import { AdminCollection, AdminFormValues } from '../model/types';

const today = () => new Date().toISOString().slice(0, 10);

export const emptyForms: Record<AdminCollection, AdminFormValues> = {
  news: {
    title: '',
    titleRu: '',
    date: today(),
    category: 'events',
    image: '',
    content: '',
    contentRu: '',
  },
  newspapers: {
    number: '',
    title: '',
    date: today(),
    pdfUrl: '',
  },
  media: {
    type: 'podcast',
    title: '',
    titleRu: '',
    guest: '',
    guestRu: '',
    description: '',
    descriptionRu: '',
    date: today(),
    url: '',
    thumbnail: '',
  },
  lessons: {
    id: '',
    type: 'text',
    title: '',
    titleRu: '',
    content: '',
    contentRu: '',
    videoUrl: '',
  },
};

export const adminTabs = [
  { id: 'news', label: 'Жаңылыктар', icon: Newspaper },
  { id: 'newspapers', label: 'Гезит', icon: FileUp },
  { id: 'media', label: 'Медиа', icon: Radio },
  { id: 'lessons', label: 'Сабактар', icon: BookOpen },
] satisfies Array<{ id: AdminCollection; label: string; icon: React.ElementType }>;

export const fieldLabels: Record<string, string> = {
  id: 'ID',
  title: 'Аталышы',
  titleRu: 'Название RU',
  date: 'Дата',
  category: 'Рубрика',
  image: 'Сүрөт URL',
  content: 'Толук текст',
  contentRu: 'Текст RU',
  number: 'Сан номери',
  pdfUrl: 'PDF URL',
  type: 'Түрү',
  guest: 'Конок',
  guestRu: 'Гость RU',
  description: 'Кыскача маалымат',
  descriptionRu: 'Описание RU',
  url: 'Медиа URL',
  thumbnail: 'Thumbnail URL',
  videoUrl: 'Видео URL',
};
