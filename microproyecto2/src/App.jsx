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



function App() {
  return (
    <>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="peliculas" element={<Peliculas title="The Godfather" description="A classic crime film" />} />
        <Route path="iniciars" element={<IniciarS />} />
      </Routes>
    </div>
    </>
  )
}

export default App;


