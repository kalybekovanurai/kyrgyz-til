import axios from 'axios';
import { Lesson, MediaItem, NewsItem, NewspaperIssue } from '@/src/types';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc, query, orderBy } from 'firebase/firestore';
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:4000'),
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
export const api = {
    news: async (): Promise<NewsItem[]> => {
        try {
            if (import.meta.env.PROD) {
                const q = query(collection(db, 'news'), orderBy('date', 'desc'));
                const snapshot = await getDocs(q);
                return mapDocs<NewsItem>(snapshot);
            }
            return apiGet<NewsItem[]>('/api/news');
        }
        catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    },
    newsItem: async (id: string): Promise<NewsItem | null> => {
        try {
            if (import.meta.env.PROD) {
                const docRef = doc(db, 'news', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() } as NewsItem;
                }
                return null;
            }
            return apiGet<NewsItem>(`/api/news/${id}`);
        }
        catch (error) {
            console.error(`Error fetching news item ${id}:`, error);
            return null;
        }
    },
    newspapers: async (): Promise<NewspaperIssue[]> => {
        try {
            if (import.meta.env.PROD) {
                const snapshot = await getDocs(collection(db, 'newspapers'));
                return mapDocs<NewspaperIssue>(snapshot);
            }
            return apiGet<NewspaperIssue[]>('/api/newspapers');
        }
        catch (error) {
            console.error('Error fetching newspapers:', error);
            return [];
        }
    },
    media: async (): Promise<MediaItem[]> => {
        try {
            if (import.meta.env.PROD) {
                const snapshot = await getDocs(collection(db, 'media'));
                return mapDocs<MediaItem>(snapshot);
            }
            return apiGet<MediaItem[]>('/api/media');
        }
        catch (error) {
            console.error('Error fetching media:', error);
            return [];
        }
    },
    mediaItem: async (id: string): Promise<MediaItem | null> => {
        try {
            if (import.meta.env.PROD) {
                const docRef = doc(db, 'media', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() } as MediaItem;
                }
                return null;
            }
            return apiGet<MediaItem>(`/api/media/${id}`);
        }
        catch (error) {
            console.error(`Error fetching media item ${id}:`, error);
            return null;
        }
    },
    lessons: async (): Promise<Lesson[]> => {
        try {
            if (import.meta.env.PROD) {
                const snapshot = await getDocs(collection(db, 'lessons'));
                return mapDocs<Lesson>(snapshot);
            }
            return apiGet<Lesson[]>('/api/lessons');
        }
        catch (error) {
            console.error('Error fetching lessons:', error);
            return [];
        }
    },
    lessonItem: async (id: string): Promise<Lesson | null> => {
        try {
            if (import.meta.env.PROD) {
                const docRef = doc(db, 'lessons', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() } as Lesson;
                }
                return null;
            }
            return apiGet<Lesson>(`/api/lessons/${id}`);
        }
        catch (error) {
            console.error(`Error fetching lesson item ${id}:`, error);
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
