import { NavLink } from 'react-router-dom'
import React from 'react'

export const Navbar = () => {
    const navLinktyles = ( {isActive }) => {
        return {
            fontWeight: isActive ? "bold": "normal",
            testDecoration: isActive ? "none": "underline"

        }
    
    }

  return (

    <nav>
        <NavLink style={navLinktyles} to = "/"> Home</NavLink>

        <NavLink style={navLinktyles} to = "/peliculas">Peliculas</NavLink>

        <NavLink style={navLinktyles} to ="/iniciars">Iniciar Sesion</NavLink>

        <NavLink style={navLinktyles} to ="/registro">Registrarse</NavLink>

        <NavLink style={navLinktyles} to ="/perfil">Perfil</NavLink>


    </nav>
    
  )
}
