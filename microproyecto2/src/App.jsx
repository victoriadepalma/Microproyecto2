// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './components/Home.jsx';
import Peliculas from './components/Peliculas.jsx';
import { Navbar } from "./components/Navbar.jsx";
import { IniciarS } from "./components/IniciarS.jsx";
import Footer from "./components/Footer.jsx";
import Grid from "./components/Grid.jsx";
import { Signup } from "./components/Signup.jsx";
import { Login } from "./components/Login.jsx"
import { Info } from "./components/Info.jsx"

// import { Auth } from "./vistas/IniciarSesion/Auth";
// import React, { useState } from 'react';
// import { onAuthStateChanged } from "firebase/auth"
// import { auth } from "./configuracion/firebase";
// import { db } from "./configuracion/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { AuthContextProvider } from "./Contexto/AuthContext";
// import { UserAuth } from './Contexto/AuthContext';
//import { IniciarSesion } from "./vistas/IniciarSesion/IniciarSesion.jsx"




function App() {
  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="peliculas" element={<Peliculas />} />
        <Route path="/Signup" element={<Signup />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/movies/:movieId" element={<Info/>} />
       
        
      </Routes>
      
      <Footer/>
    </div>
    </>
  )
}

export default App;


