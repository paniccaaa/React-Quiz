// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBRpqALHPW6QnqpfdnyrZbZihXCxn2g0IE',
  authDomain: 'rn-quiz-5ca11.firebaseapp.com',
  projectId: 'rn-quiz-5ca11',
  storageBucket: 'rn-quiz-5ca11.appspot.com',
  messagingSenderId: '215429339148',
  appId: '1:215429339148:web:a8deee6e54ea13fc4bf629',
  measurementId: 'G-ZFDCWMHZCH',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
