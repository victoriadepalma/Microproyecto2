import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { db,auth,googleProvider } from "../components/firebase";
import {doc,setDoc,getDoc} from 'firebase/firestore';


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (name, lastName, cedula, email, password,setErrorMsg) => {
            try{
                console.log('entre')
                const info = await createUserWithEmailAndPassword(auth, email,password).then((usuarioFirebase)=>{return usuarioFirebase})
                console.log(info)
                const docuRef = await doc(db, `users/${info.user.uid}`)
                console.log(docuRef)
                setDoc(docuRef,{name:name+" "+lastName,cedula,email,role:'user'})
             }catch(err){
                 console.log(err)
                 setErrorMsg(err.message)
             }
     
     
        };

        const createUserWithGoogle = async(setErrorMsg) =>{
            console.log("kjhbgvfcfvghjk")
            try{
                const info =  await signInWithPopup(auth, googleProvider).then((usuarioFirebase)=>{return usuarioFirebase})
                const docuRef = await doc(db, `users/${info.user.uid}`)
                setDoc(docuRef,{name:info.user.displayName,email:info.user.email,role:'user'})
            }catch(err){
                console.log(err)
                setErrorMsg(err.message)
            }
    
    
        }
   const signIn = (email, password,setErrorMsg) =>  {
    signInWithEmailAndPassword(auth, email, password).then(async (res) => {
          
        //   navigate("/");
        })
        .catch((err) => {
        
          setErrorMsg(err.message);
        });
   }

  const logout = () => {
      return signOut(auth)
  }

  const getUser = async (uid) => {
    const docuRef = await doc(db, `users/${uid}`);
    const data = await getDoc(docuRef);
    const dataFiltered = data.data();
    return dataFiltered;
  };

  const getInfo=async(firebaseUser)=>{

    if (firebaseUser !=null) {
              if (!user) {
               return await getUser(firebaseUser.uid).then((data) => {
                  const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: data.name,
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
            role: data.role,
          };
          setUser(userData);
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

export const UserAuth = () => {
  return useContext(UserContext);
};