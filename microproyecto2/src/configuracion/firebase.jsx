import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAsXc2aTcEIhl75tB2lVAcXpNJ439EGJQs",
  authDomain: "microproyecto2-87b08.firebaseapp.com",
  projectId: "microproyecto2-87b08",
  storageBucket: "microproyecto2-87b08.appspot.com",
  messagingSenderId: "546421430927",
  appId: "1:546421430927:web:e24fc2bb6d3100b4ff2efa"
};


export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app); //conexion con el modulo de autenticacion de Firebase
export const db=getFirestore();//conexion con el modulo de base de datos de Firebase
export const stpre=getStorage(app);//conexion con el modulo de storage de Firebase
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'}); //para seleccionar entre las multiples cuentas de google