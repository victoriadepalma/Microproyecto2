// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Routes, Route } from "react-router-dom";
import React from 'react';
import { AuthContextProvider } from "./context/AuthContext";
import { Router } from "./Routes/Router";




function App() {

  return (
    <>
    <div>
    <AuthContextProvider>
       <Router/>
      </AuthContextProvider>
    </div>
    </>
  )
}

export default App;


