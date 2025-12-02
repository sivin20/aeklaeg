import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD52-Jdldge_8Wnuh1PuY9IDtl3e-7sCnI',
  authDomain: 'aeklaeg.firebaseapp.com',
  projectId: 'aeklaeg',
  storageBucket: 'aeklaeg.firebasestorage.app',
  messagingSenderId: '758746279434',
  appId: '1:758746279434:web:f93633a61e5c26b22e79f3',
  measurementId: 'G-Y9K07CKWZC',
  databaseURL: 'https://aeklaeg-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
