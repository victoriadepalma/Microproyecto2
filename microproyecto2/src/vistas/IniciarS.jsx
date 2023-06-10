import React from 'react'

export const IniciarS = () => {
  return (
    <section class= "input-container">
    <input
        type="text" 
        name= "query"
        id="query"
        class="search Input"
        placeholder= "Ingresar correo"
    />
    <input
        type="text" 
        name= "query"
        id="query"
        class="search Input"
        placeholder= "Ingresar contraseña"
    />

        <button type= "button" class= "searchButton" id= "searchButton"> Enviar </button> 

</section>

  )
}
