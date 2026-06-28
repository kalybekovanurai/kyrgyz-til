import axios from 'axios';
import { Lesson, MediaItem, NewsItem, NewspaperIssue, SiteSettings } from '@/src/types';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc, query, orderBy } from 'firebase/firestore';
const envUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalhostUrl = envUrl && /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(envUrl);
const baseURL = envUrl && !(import.meta.env.DEV && isLocalhostUrl) ? envUrl : undefined;

export const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const apiGet = async <T>(path: string): Promise<T> => {
    const response = await apiClient.get<T>(path);
    return response.data;
};
// Helper to convert Firestore snapshot to data
const mapDocs = <T>(snapshot: any): T[] => {
    return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    })) as T[];
};
const getFirestoreList = async <T>(collectionName: string): Promise<T[]> => {
    const snapshot = await getDocs(collection(db, collectionName));
    return mapDocs<T>(snapshot);
};
const getFirestoreItem = async <T>(collectionName: string, id: string): Promise<T | null> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
};
export const api = {
    news: async (): Promise<NewsItem[]> => {
        try {
            const q = query(collection(db, 'news'), orderBy('date', 'desc'));
            const snapshot = await getDocs(q);
            return mapDocs<NewsItem>(snapshot);
        }
        catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    },
    newsItem: async (id: string): Promise<NewsItem | null> => {
        try {
            return getFirestoreItem<NewsItem>('news', id);
        }
        catch (error) {
            console.error(`Error fetching news item ${id}:`, error);
            return null;
        }
    },
    newspapers: async (): Promise<NewspaperIssue[]> => {
        try {
            return getFirestoreList<NewspaperIssue>('newspapers');
        }
        catch (error) {
            console.error('Error fetching newspapers:', error);
            return [];
        }
    },
    media: async (): Promise<MediaItem[]> => {
        try {
            return getFirestoreList<MediaItem>('media');
        }
        catch (error) {
            console.error('Error fetching media:', error);
            return [];
        }
    },
    mediaItem: async (id: string): Promise<MediaItem | null> => {
        try {
            return getFirestoreItem<MediaItem>('media', id);
        }
        catch (error) {
            console.error(`Error fetching media item ${id}:`, error);
            return null;
        }
    },
    lessons: async (): Promise<Lesson[]> => {
        try {
            return getFirestoreList<Lesson>('lessons');
        }
        catch (error) {
            console.error('Error fetching lessons:', error);
            return [];
        }
    },
    lessonItem: async (id: string): Promise<Lesson | null> => {
        try {
            return getFirestoreItem<Lesson>('lessons', id);
        }
        catch (error) {
            console.error(`Error fetching lesson item ${id}:`, error);
            return null;
        }
    },
    siteSettings: async (): Promise<SiteSettings[]> => {
        try {
            return getFirestoreList<SiteSettings>('siteSettings');
        }
        catch (error) {
            console.error('Error fetching site settings:', error);
            return [];
        }
    },
    siteSettingsItem: async (id: string): Promise<SiteSettings | null> => {
        try {
            return getFirestoreItem<SiteSettings>('siteSettings', id);
        }
        catch (error) {
            console.error(`Error fetching site settings ${id}:`, error);
            return null;
        }
    },
};
export const adminRequest = async <T>(path: string, token: string, options: {
    method?: 'POST' | 'PUT' | 'DELETE';
    data?: unknown;
    formData?: FormData;
} = {}): Promise<T> => {
    const response = await apiClient.request<T>({
        url: path,
        method: options.method || 'GET',
        data: options.formData || options.data,
        headers: {
            'x-admin-token': token,
            ...(options.formData ? { 'Content-Type': 'multipart/form-data' } : {}),
        },
    });
    return response.data;
};
