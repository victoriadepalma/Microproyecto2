import styles from "./Login.module.css";
import { InputControl } from "./InputControl";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", pass: "" });
  const [errorMsg, setErrorMsg] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const { signIn,createUserWithGoogle } = UserAuth();

  const IniciarConGoogle=async(e)=>{
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
  const Iniciar = async (e)=>{
    e.preventDefault();
    if (!values.email || !values.pass) {
          setErrorMsg("Datos incompletos");
          return;
        }
        setErrorMsg("");
        setSubmitButtonDisabled(true);
    try {
      await signIn(values.email, values.pass,(message)=>{setErrorMsg(message)})
      setSubmitButtonDisabled(false);
      navigate('/')
    } catch (e) {
      setErrorMsg(e.message)
      setSubmitButtonDisabled(false);
      console.log(e.message)
    }

  }
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Iniciar Sesión</h1>
        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Ingrese su correo"
        />
        <InputControl
        type='password'
          label="Contraseña"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Ingrese su contraseña"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={(e)=>{Iniciar(e)}} disabled={submitButtonDisabled}>Login</button>
          <button onClick={(e)=>{IniciarConGoogle(e)}} >Login con Google</button>
          <p>
            Crear cuenta
            <span>
              <Link to="/signup"> ir</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
