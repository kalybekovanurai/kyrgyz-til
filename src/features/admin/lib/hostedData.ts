import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { AdminItem, HostedCollection } from '../model/types';
export const saveHostedItem = async (collection: HostedCollection, item: AdminItem) => {
    await setDoc(doc(db, collection, item.id), item, { merge: true });
};
export const deleteHostedItem = async (collection: HostedCollection, id: string) => {
    await deleteDoc(doc(db, collection, id));
};
