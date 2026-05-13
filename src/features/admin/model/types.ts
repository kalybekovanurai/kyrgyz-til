export type AdminCollection = 'news' | 'newspapers' | 'media' | 'lessons';

export type AdminItem = {
  id: string;
  title?: string;
  number?: string;
  date?: string;
  type?: string;
  content?: string;
  description?: string;
  pdfUrl?: string;
  url?: string;
  [key: string]: unknown;
};

export type AdminFormValues = Record<string, string>;
