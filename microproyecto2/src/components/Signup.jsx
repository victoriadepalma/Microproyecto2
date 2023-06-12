import styles from "./Signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { UserAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InputControl } from "./InputControl";
export function Signup() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({ name: "",lastName:"",cedula:"", email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const { createUser,createUserWithGoogle } = UserAuth();


  const registroConGoogle=async(e)=>{
    e.preventDefault();
    setErrorMsg('');
    try {
      await createUserWithGoogle((message)=>{setErrorMsg(message)});
      navigate('/')
    } catch (e) {
      setErrorMsg(e.message);
      console.log(e.message);
    }

  }
  const registro=async(e)=>{
    e.preventDefault();
       if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Llene todos los campos");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    try {
      await createUser(values.name, values.lastName,values.cedula,values.email,values.pass,(message)=>{setErrorMsg(message)});
      setSubmitButtonDisabled(false);
      navigate('/')
    } catch (e) {
      setErrorMsg(e.message);
      setSubmitButtonDisabled(false);
      console.log(e.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Registro</h1>
        <InputControl
          label="Nombre"
          placeholder="Ingrese su nombre"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
           <InputControl
          label="Apellido"
          placeholder="Ingrese su nombre"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, lastName: event.target.value }))
          }
        />
               <InputControl
          label="Cedula"
          placeholder="Ingrese su cedula"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, cedula: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Ingrese un correo"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
              type='password'
          label="Contraseña"
          placeholder="Ingrese una contraseña"
          onChange={(event) =>
            setvalues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={(e)=>{registro(e)}} disabled={submitButtonDisabled}>
            Guardar
          </button>
          <button onClick={(e)=>{registroConGoogle(e)}} >
            Iniciar Sesión con Google
          </button>
          <p>
            Si ya tienes una cuenta inicia sesión
            <span>
              <Link to="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}