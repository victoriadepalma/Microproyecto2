import { auth, googleProvider } from "../../configuracion/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import {useState} from "react";
import { db } from ".configuracion/firebase";
import {doc,setDoc} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Contexto/AuthContext';
import './IniciarSesion.css'

export const Auth = () => {

const [email, setEmail]=useState("")
const [password, setPassword]=useState("")
const [error, setError] = useState('');
const navigate = useNavigate();
const { signIn,createUserWithGoogle } = UserAuth();


    const login = async(e) =>{
        e.preventDefault();
        setError('')
        try {
          await signIn(email, password)
          navigate('/account')
        } catch (e) {
          setError(e.message)
          console.log(e.message)
        }


    }
    const signInWithGoogle = async(e) =>{
        e.preventDefault();
        setError('');
        try {
          await createUserWithGoogle();
          navigate('/')
        } catch (e) {
          setError(e.message);
          console.log(e.message);
        }


    }

    const logOut = async() =>{
        try{
            await signOut(auth)
        }catch(err){
            console.log(err)
        }


    }
return (
    <div>
        <input placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input placeholder='Contraseña' onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button onClick={(e)=>{login(e)}}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={logOut}>Log Out</button>
    </div>
)
}
export default Auth;