// import React from "react";
// // import "./Grid.css";

// function Grid() {
//   return (
   
//     <div className="grid">
       
//       <div className="imagen">
//       <img
//           src="https://ohsmagnet.com/wp-content/uploads/2019/04/unnamed-607x900.jpg"
//           alt="Imagen verticalmente larga"
//         />
//       </div>
     
      
//       <div className="imagen">
//         <img
//           src="https://lumiere-a.akamaihd.net/v1/images/image_be473c63.jpeg?region=0,0,540,810"
//           alt="Imagen verticalmente larga"
//         />
//       </div>
//       <div className="imagen"> <img
//           src="https://pics.filmaffinity.com/Dune-209834814-large.jpg"
//           alt="Imagen verticalmente larga"
//         /></div>
      
//       <div className="imagen">
//         <img src=" https://static.diariofemenino.com/pictures/fotos/217000/217909-4.jpg"
//           alt="Imagen verticalmente larga"
//         /></div>
     
//       <div className="imagen"><img src=" https://images.saymedia-content.com/.image/t_share/MTg4ODg1NzM3MTE3NTkxMDcy/is-everything-everywhere-all-at-once-already-the-best-movie.jpg"
//           alt="Imagen verticalmente larga"
//         /></div>
        
//       <div className="imagen"><img src=" https://upload.wikimedia.org/wikipedia/en/1/13/Top_Gun_Maverick_Poster.jpg"
//           alt="Imagen verticalmente larga"
//         /></div>
//       <div className="imagen"><img src=" https://cdn.marvel.com/content/1x/blackwidow_lob_crd_06.jpg"
//           alt="Imagen verticalmente larga"
//         /></div>
//       <div className="imagen"><img src=" https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg"
//           alt="Imagen verticalmente larga"
//         /></div>
//     </div>
//   );
// }

// export default Grid;

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Grid.module.css";
import Peliculas from "./Peliculas";

function Grid({ movies,genres }) {
  const navigate=useNavigate()
  const getGenres=(array)=>{
    let aux=[]
    for(let i=0;i<genres.length;i++){
      console.log(genres[i].id,array)
      if(array.includes(genres[i].id)){
        console.log('kkkkk')
aux.push(genres[i])
      }
    }
  console.log(aux)
return aux
  }
  
  return (
    <div className={styles.grid}>
      {movies.map(movie => (
      <div className={styles.movie} onClick={()=>{navigate(`/movies/${movie.id.toString()}`)}}>
      <img  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
      <div className={styles.hoverEffect}>
        <h1>{movie.title}</h1>
        <h2>Idioma: {movie.original_language}</h2>
        <div className={styles.genre}>
          <h3>Generos: </h3>
        {getGenres(movie.genre_ids).map((genre) => (
          <>
                <h3>{genre.name}</h3>
                <h3 className={styles.comma}>,</h3>
                </>
              ))}
              
              <h3 className={styles.dot}>.</h3>
              </div>
      </div>
         
        </div>
        
        
      
        
      ))}
    </div>
  );
  
}

export default Grid;


// import React from "react";
// import styles from "./Grid.module.css";

// function Grid({ movies }) {
//   const handleImageError = event => {
//     event.target.src = "imagen_de_respaldo.jpg"; // ruta a la imagen de respaldo
//   };

//   return (
//     <div className={styles.grid}>
//       {movies.map(movie => (
//         <div key={movie.id} className={styles.movie}>
//           <img
//             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//             alt={movie.title}
//             onError={handleImageError}
//           />
//           <h3>{movie.title}</h3>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Grid;