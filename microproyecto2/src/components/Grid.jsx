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

import React from "react";
import styles from "./Grid.module.css";

function Grid({ movies }) {
  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <div key={movie.id} className={styles.movie}>
          <div className={styles.movieContainer}>
            
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
             
            />
            
            
            {/* <div>
            <h3>{movie.title}</h3>
            <h3>{movie.original_language}</h3>
            </div> */}
            
            

            <div className="movieContainer">
  
  <h3 className="title">{movie.title}</h3>
  <h3 className="language">Idioma: {movie.original_language}</h3>
</div>

          </div>
          <h3>{movie.title}</h3>
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