import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, } from 'firebase/firestore';
import { db } from './firebase';
import { AdminCollection } from '@/src/features/admin/model/types';
/**
 * In production, write operations go directly to Firestore.
 * The admin "token" is validated client-side against VITE_ADMIN_TOKEN env var.
 */
export const checkAdminToken = (token: string): boolean => {
    const expected = import.meta.env.VITE_ADMIN_TOKEN as string | undefined;
    if (!expected)
        return false;
    return token.trim() === expected.trim();
};
export const firestoreCreate = async (col: AdminCollection, data: Record<string, unknown>): Promise<{
    id: string;
}> => {
    const ref = await addDoc(collection(db, col), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return { id: ref.id };
};
export const firestoreUpdate = async (col: AdminCollection, id: string, data: Record<string, unknown>): Promise<void> => {
    const ref = doc(db, col, id);
    await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
    });
};
export const firestoreDelete = async (col: AdminCollection, id: string): Promise<void> => {
    const ref = doc(db, col, id);
    await deleteDoc(ref);
};
