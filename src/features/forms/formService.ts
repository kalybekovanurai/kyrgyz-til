import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { apiClient } from '@/src/lib/api';
import { db } from '@/src/lib/firebase';
import { ContactMessagePayload, SubscriptionPayload } from './types';
export const submitSubscription = async (payload: SubscriptionPayload) => {
    const data = {
        ...payload,
        email: payload.email.trim().toLowerCase(),
        source: payload.source || 'website',
    };
    if (import.meta.env.PROD) {
        await addDoc(collection(db, 'subscriptions'), {
            ...data,
            createdAt: serverTimestamp(),
        });
        return;
    }
    await apiClient.post('/api/forms/subscriptions', data);
};
export const submitContactMessage = async (payload: ContactMessagePayload) => {
    const data = {
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        message: payload.message.trim(),
    };
    if (import.meta.env.PROD) {
        await addDoc(collection(db, 'contact_messages'), {
            ...data,
            createdAt: serverTimestamp(),
        });
        return;
    }
    await apiClient.post('/api/forms/contact-messages', data);
};
