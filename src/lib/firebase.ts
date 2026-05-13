import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "kyrgyz-til",
  appId: "1:749218726563:web:48d13ce578d14fa2ab7516",
  storageBucket: "kyrgyz-til.firebasestorage.app",
  apiKey: "AIzaSyDEaNWJrMsV8vgnT5sSVITw5nMc953Tj4Q",
  authDomain: "kyrgyz-til.firebaseapp.com",
  messagingSenderId: "749218726563",
  measurementId: "G-JVH9CQ256W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
