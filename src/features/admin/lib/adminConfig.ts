import type React from 'react';
import { BookOpen, FileUp, Newspaper, Radio } from 'lucide-react';
import { AdminCollection, AdminFormValues } from '../model/types';

type AdminLanguage = 'ky' | 'ru';

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
    category: 'history',
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
  { id: 'news', labels: { ky: 'Жаңылыктар', ru: 'Новости' }, icon: Newspaper },
  { id: 'newspapers', labels: { ky: 'Гезит', ru: 'Газета' }, icon: FileUp },
  { id: 'media', labels: { ky: 'Медиа', ru: 'Медиа' }, icon: Radio },
  { id: 'lessons', labels: { ky: 'Сабактар', ru: 'Уроки' }, icon: BookOpen },
] satisfies Array<{ id: AdminCollection; labels: Record<AdminLanguage, string>; icon: React.ElementType }>;

export const fieldLabels: Record<AdminLanguage, Record<string, string>> = {
  ky: {
    id: 'ID',
    title: 'Аталышы',
    titleRu: 'Аталышы RU',
    date: 'Дата',
    category: 'Рубрика',
    image: 'Сүрөт URL',
    content: 'Толук текст',
    contentRu: 'Текст RU',
    number: 'Сан номери',
    pdfUrl: 'PDF шилтеме',
    type: 'Түрү',
    guest: 'Конок',
    guestRu: 'Конок RU',
    description: 'Кыскача маалымат',
    descriptionRu: 'Сүрөттөмө RU',
    url: 'Медиа URL',
    thumbnail: 'Thumbnail URL',
    videoUrl: 'Видео URL',
  },
  ru: {
    id: 'ID',
    title: 'Название',
    titleRu: 'Название RU',
    date: 'Дата',
    category: 'Рубрика',
    image: 'URL изображения',
    content: 'Полный текст',
    contentRu: 'Текст RU',
    number: 'Номер выпуска',
    pdfUrl: 'Ссылка на PDF',
    type: 'Тип',
    guest: 'Гость',
    guestRu: 'Гость RU',
    description: 'Краткое описание',
    descriptionRu: 'Описание RU',
    url: 'Медиа URL',
    thumbnail: 'Thumbnail URL',
    videoUrl: 'Видео URL',
  },
};

export const categoryOptions = {
  news: [
    { value: 'events', labels: { ky: 'Иш-чаралар', ru: 'Мероприятия' } },
    { value: 'laws', labels: { ky: 'Мыйзамдар', ru: 'Законы' } },
    { value: 'projects', labels: { ky: 'Долбоорлор', ru: 'Проекты' } },
    { value: 'education', labels: { ky: 'Окутуу', ru: 'Обучение' } },
    { value: 'media_news', labels: { ky: 'Медиа жаңылыктар', ru: 'Медиа новости' } },
  ],
  media: [
    { value: 'tech', labels: { ky: 'Технология', ru: 'Технологии' } },
    { value: 'history', labels: { ky: 'Тарых', ru: 'История' } },
    { value: 'culture', labels: { ky: 'Маданият', ru: 'Культура' } },
    { value: 'education', labels: { ky: 'Билим берүү', ru: 'Образование' } },
  ],
};

export const typeOptions = [
  { value: 'podcast', labels: { ky: 'Подкаст', ru: 'Подкаст' } },
  { value: 'survey', labels: { ky: 'Сурамжылоо', ru: 'Опрос' } },
  { value: 'video', labels: { ky: 'Видео', ru: 'Видео' } },
  { value: 'text', labels: { ky: 'Текст сабак', ru: 'Текстовый урок' } },
  { value: 'test', labels: { ky: 'Тест', ru: 'Тест' } },
];

export const adminText = {
  ky: {
    pageTitle: 'Админ панель',
    backendSubtitle: 'Kyrgyztil.kg backend',
    checkingSession: 'Сессия текшерилип жатат...',
    saving: 'Сакталып жатат...',
    saved: 'Материал серверде жана хостинг маалыматтарында сакталды.',
    updating: 'Өзгөртүүлөр сакталып жатат...',
    updated: 'Өзгөртүүлөр серверде жана хостинг маалыматтарында сакталды.',
    deleting: 'Өчүрүлүп жатат...',
    deleted: 'Материал серверден жана хостинг маалыматтарынан өчүрүлдү.',
    uploading: 'Файл жүктөлүп жатат...',
    uploaded: 'Файл жүктөлдү. URL талаага көчүрүп колдонсоңуз болот.',
  },
  ru: {
    pageTitle: 'Админ панель',
    backendSubtitle: 'Kyrgyztil.kg backend',
    checkingSession: 'Сессия проверяется...',
    saving: 'Сохраняется...',
    saved: 'Материал сохранен на сервере и в данных хостинга.',
    updating: 'Изменения сохраняются...',
    updated: 'Изменения сохранены на сервере и в данных хостинга.',
    deleting: 'Удаляется...',
    deleted: 'Материал удален с сервера и из данных хостинга.',
    uploading: 'Файл загружается...',
    uploaded: 'Файл загружен. URL можно вставить в нужное поле.',
  },
};
