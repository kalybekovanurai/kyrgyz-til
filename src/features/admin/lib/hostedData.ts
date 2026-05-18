import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { AdminCollection, AdminItem } from '../model/types';
export const saveHostedItem = async (collection: AdminCollection, item: AdminItem) => {
    await setDoc(doc(db, collection, item.id), item, { merge: true });
};
export const deleteHostedItem = async (collection: AdminCollection, id: string) => {
    await deleteDoc(doc(db, collection, id));
};
