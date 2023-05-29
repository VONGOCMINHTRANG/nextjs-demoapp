// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBczJOAs6W79s6kdXoiLLEKsBG2Sfl7K4U",
  authDomain: "nextjs-demoapp-b99b2.firebaseapp.com",
  projectId: "nextjs-demoapp-b99b2",
  storageBucket: "nextjs-demoapp-b99b2.appspot.com",
  messagingSenderId: "837438599132",
  appId: "1:837438599132:web:0e02badb1c979cbf632919",
  measurementId: "G-1LSQWKE6SK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)