import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { db,auth,googleProvider } from "../configuracion/firebase";
import {doc,setDoc,getDoc} from 'firebase/firestore';

const UserContext=createContext(); //metodo para crear contexto

export const AuthContextProvider=({children})=>{
  const [user,setUser]=useState(null); //useState define el estado local almacenando informacion del usuario actualmente autenticado y el estado de carga
  const[loading,setLoading]=useState(true);

  const createUser=async(name,lastName,cedula,email,password)=>{ //se crea el usuario 
    try {
      const info=await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirebase)=>{return usuarioFirebase})
      const docuRef= await doc(db,`users/${info.user.uid}`)
      setDoc(docuRef,{name:name +lastName,cedula,email,user:'user'}) //se crea documento en base de datos con la info del usuario

      
    } catch (error) {
      console.log(error)
      
    }
  };
  const createUserWithGoogle=async()=>{ //crea usuario con email y contraseña
    try {
      const info=await signInWithPopup(auth,googleProvider).then((usuarioFirebase)=>{return usuarioFirebase})//se asigna el objeto del usuario de firebase a la constante 
      const docuRef=await doc(db,`users/${info.user.uid}`)
      setDoc(docuRef,{name:info.user.displayName,email:info.user.email, role:'user'}) //se crea documento en base de datos con la info del usuario
      
    } catch (error) {
      console.log(error)
      
    }

  }
  const signIn=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  const logout=()=>{
    return signOut(auth)
  }
  const getUser=async(uid)=>{
    const docuRef=await doc(db,`users/${info.user.uid}`); //referencia a un documento en la coleccion de users de firebase del uid proporcionado
    const data=await getDoc(docuRef); //obtiene contenido del documento 
    const dataFiltered=data.data();//funcion data para obtener los datos del documento y se almacena en dataFiltered
    return dataFiltered;
  };


  //para obtener informacion del usuario actualmente autenticado
  const getInfo=async(firebaseUser)=>{

    if (firebaseUser !=null) {//se comprueba que el firebaseUser no sea null
              if (!user) {// se comprueba que el objeto user este definido (user tiene info adicional del usuario)
               return await getUser(firebaseUser.uid).then((data) => { //si no esta definido se usa getUser para obtener la info del usuario
                  const userData = { //se asigna a un objeto (userData) junto con uid y email obtenidos en firebaseuser
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: data.name,
                    cedula:data.cedula,
                    role: data.role,
                  };
                  console.log('user',userData)
                 return userData; 
              
                });
              }
            } else {
            return null
            }
  }

  onAuthStateChanged(auth, (firebaseUser) => { 
    if (firebaseUser) {
      if (!user) {
        getUser(firebaseUser.uid).then((data) => {
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: data.name,
            cedula:data.cedula,
            role: data.role,
          };
          setUser(userData);// se establece el objeto userData como el estado actual del usuario en la aplicacion
         setLoading(false)
        });
      }
    } else {
      setUser(null);
      setLoading(false)
    }
  });

  return (
    <UserContext.Provider value={{ createUser, user, loading, logout, signIn,createUserWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => { //proporcionar acceso al contexto con la funcion useContext 
  return useContext(UserContext);

};