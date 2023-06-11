// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Routes, Route } from "react-router-dom";
import React from 'react';
import Home from './vistas/Home.jsx';
import Peliculas from './vistas/Peliculas.jsx';
import { Navbar } from "./vistas/Navbar.jsx";
import { IniciarS } from "./vistas/IniciarS.jsx";
import Footer from "./vistas/Footer.jsx";
import Grid from "./vistas/Grid.jsx";
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
        <Route path="peliculas" element={<Peliculas title="The Godfather" description="A classic crime film" />} />
        <Route path="iniciarsesion" element={<IniciarS/>} />
      </Routes>
      <Grid/>
      <Footer/>
    </div>
    </>
  )
}

export default App;


