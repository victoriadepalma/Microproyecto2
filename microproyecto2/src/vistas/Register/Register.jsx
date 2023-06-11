import { auth, googleProvider } from "../../configuracion/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import {useState} from "react";
import { UserAuth } from '../../Contexto/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { db } from "../../configuracion/firebase";
import {doc,setDoc} from 'firebase/firestore';
import './Register.css'

export const Register = () => {
    const [name, setName]=useState("") //useState para definir el estado de entrada
    const [lastName, setLastName]=useState("")
    const [cedula, setCedula]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [password2, setPassword2]=useState("")
    const [error, setError] = useState('')
    
    const { createUser,createUserWithGoogle } = UserAuth();// obtener funciones create user y createUserWithGoogle del contexto del usuario
    const navigate = useNavigate()
    
    
        const register = async(e) =>{
            e.preventDefault();
        setError(''); //eliminar cualquier error existente
        try {
          await createUser(name, lastName,cedula,email,password); //se llama a create user
          navigate('/') //si es exitoso se llama a navigate para mandar al usuario a la pagina de inicio
        } catch (e) {
          setError(e.message);
          console.log(e.message);
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
    
    
    return (
        <div className="fullscreen center">
            <div className="authform">
            <input placeholder='Nombre' onChange={(e)=>{setName(e.target.value)}}></input>
            <input placeholder='Apellido' onChange={(e)=>{setLastName(e.target.value)}}></input>
            <input placeholder='Cedula' onChange={(e)=>{setCedula(e.target.value)}}></input>
            <input placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input placeholder='Contraseña' onChange={(e)=>{setPassword(e.target.value)}}></input>
            <input placeholder='Confirmar Contraseña' onChange={(e)=>{setPassword2(e.target.value)}}></input>
            <button onClick={(e)=>{register(e)}}>Registrarse</button> 
            <button onClick={(e)=>{signInWithGoogle(e)}}>Sign In with Google</button>
    
            </div>
        </div>
    )
    }