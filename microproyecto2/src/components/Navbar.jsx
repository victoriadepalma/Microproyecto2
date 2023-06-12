import { NavLink } from 'react-router-dom'
import React from 'react'
import logo from '../../imagenes/logo2.png';

export const Navbar = () => {
    const navLinktyles = ( {isActive }) => {
        return {
            fontWeight: isActive ? "bold": "normal",
            testDecoration: isActive ? "none": "underline"

        }
    
    }

  return (
    <nav>

<div className="logoContainer">
<img src={logo}></img>
</div>
<div className="navbar">

       
        <NavLink style={navLinktyles} to = "/"> Home</NavLink>

        <NavLink style={navLinktyles} to = "/peliculas">Peliculas</NavLink>

        <NavLink style={navLinktyles} to ="/Signup">Registrarse</NavLink>

        <NavLink style={navLinktyles} to ="/Login">Iniciar Sesion</NavLink>

        <NavLink style={navLinktyles} to ="/perfil">Perfil</NavLink>

       <NavLink style={navLinktyles} to ="/proximos-estrenos">Proximos Estrenos</NavLink>



      


 
    </div>
    </nav>
    
  )
}
