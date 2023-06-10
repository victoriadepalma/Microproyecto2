import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div className="container"> 
    <section className="header"> 
        <h1 className="title" id="maintitle"> SPOTIFINDER</h1> 
        <h4 className="subtitle" id="subtitle">
    Find your favorite artists and see their popular songs
    </h4> 

    <input
        type="text" 
        name= "query"
        id="query"
        className="search Input"
        placeholder= "Busca tu artista favorito"
    />

        <button type= "button" className= "searchButton" id= "searchButton">
        Buscar 
        </button> 

    <div id = "slide-0" className="slide-fade">
      <img src="https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-51.jpg" alt="img0"></img>
    </div>
    </section>

{/* <section className= "input-container">
    <input
        type="text" 
        name= "query"
        id="query"
        className="search Input"
        placeholder= "Busca tu artista favorito"
    />

        <button type= "button" className= "searchButton" id= "searchButton">
        Buscar 
        </button> 

</section> */}

<section id="results" className="results"></section>

</div>
)
}


export default App
