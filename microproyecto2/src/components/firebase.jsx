
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsXc2aTcEIhl75tB2lVAcXpNJ439EGJQs",
  authDomain: "microproyecto2-87b08.firebaseapp.com",
  projectId: "microproyecto2-87b08",
  storageBucket: "microproyecto2-87b08.appspot.com",
  messagingSenderId: "546421430927",
  appId: "1:546421430927:web:e24fc2bb6d3100b4ff2efa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore();