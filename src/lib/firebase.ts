import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCiSh-Tj6sITaT0ZxNARG3lmXhmT_J_H0o",
  authDomain: "estoquekadock.firebaseapp.com",
  projectId: "estoquekadock",
  storageBucket: "estoquekadock.firebasestorage.app",
  messagingSenderId: "496988245667",
  appId: "1:496988245667:web:29ab49ae10828c99537916",
  measurementId: "G-BCL6T2TEBR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);