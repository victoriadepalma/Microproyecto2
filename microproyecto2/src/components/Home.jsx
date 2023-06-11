// import React, { useState, useEffect, useRef } from "react";
// // import Grid from "./Grid";


// const images = [
//   "imagenes/imagen1.jpg",
//   "imagenes/imagen2.jpg",
//   "imagenes/imagen3.jpg",
//   "imagenes/imagen4.jpg",
//   "imagenes/imagen5.jpg",
// ];

// function Home() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleNext = () => {
//     setActiveIndex((activeIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
//   };

//   const intervalRef = useRef(null);

//   useEffect(() => {
//     const transitionDuration = 1000; // duración de la transición CSS en milisegundos
//     const intervalTime = transitionDuration + 5000; // intervalo de tiempo dinámico

//     intervalRef.current = setInterval(handleNext, intervalTime);

//     return () => clearInterval(intervalRef.current);
//   }, [activeIndex]);

//   useEffect(() => {
//     if (activeIndex === images.length - 1) {
//       setActiveIndex(0);
//     }
//   }, [activeIndex]);

//   const slideWidth = 800; // anchura de una sola imagen
//   const slideCount = images.length;
//   const carouselWidth = slideWidth * slideCount;

//   return (
//     <div>
//       <div className="carousel">
//         <div
//           className="slides"
//           style={{ transform: `translateX(-${activeIndex * slideWidth}px)`, width: `${carouselWidth}px` }}
//         >
//           {images.map((image, index) => (
//             <div key={index} className="slide">
//               <img src={image} alt={`Slide ${index + 1}`} />
//             </div>
//           ))}
//         </div>
//         <button className="prev" onClick={handlePrev}>
//           &#10094;
//         </button>
//         <button className="next" onClick={handleNext}>
//           &#10095;
//         </button>
//       </div>
//       <div></div>

//       {/* Aquí va el resto del contenido del homepage */}
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import Grid from "./Grid";


const images = [
  "imagenes/imagen1.jpg",
  "imagenes/imagen2.jpg",
  "imagenes/imagen3.jpg",
  "imagenes/imagen4.jpg",
  "imagenes/imagen5.jpg",
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const intervalRef = useRef(null);

  useEffect(() => {
    const transitionDuration = 1000; // duración de la transición CSS en milisegundos
    const intervalTime = transitionDuration + 5000; // intervalo de tiempo dinámico

    intervalRef.current = setInterval(handleNext, intervalTime);

    return () => clearInterval(intervalRef.current);
  }, [activeIndex]);

  useEffect(() => {
    const apiKey = "75f73a894a20e4ee1c51851645a6eae2";
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  const slideWidth = 800; // anchura de una sola imagen
  const slideCount = images.length;
  const carouselWidth = slideWidth * slideCount;

  return (
    <div>
      <div className="carousel">
        <div
          className="slides"
          style={{ transform: `translateX(-${activeIndex * slideWidth}px)`, width: `${carouselWidth}px` }}
        >
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="prev" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
      <div>
        <Grid movies={movies} />
      </div>
    </div>
  );
}

export default Home;




// import React, { useState, useEffect, useRef } from "react";
// import Grid from "./Grid";

// function Home() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [movies, setMovies] = useState([]);

//   const handleNext = () => {
//     setActiveIndex((activeIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
//   };

//   const intervalRef = useRef(null);

//   useEffect(() => {
//     const transitionDuration = 1000; // duración de la transición CSS en milisegundos
//     const intervalTime = transitionDuration + 5000; // intervalo de tiempo dinámico

//     intervalRef.current = setInterval(handleNext, intervalTime);

//     return () => clearInterval(intervalRef.current);
//   }, [activeIndex]);

//   useEffect(() => {
//     const apiKey = "75f73a894a20e4ee1c51851645a6eae2";
//     const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

//     async function fetchMovies() {
//       let allMovies = [];
//       let page = 1;
//       let totalPages = 1;

//       while (page <= totalPages) {
//         const response = await fetch(`${apiUrl}&page=${page}`);
//         const data = await response.json();

//         allMovies = [...allMovies, ...data.results];
//         page = data.page;
//         totalPages = data.total_pages;
//       }

//       setMovies(allMovies);
//       console.log(allMovies); // agrega este console.log para depurar
//     }

//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     if (activeIndex === images.length - 1) {
//       setActiveIndex(0);
//     }
//   }, [activeIndex]);

//   const images = [
//     "imagenes/imagen1.jpg",
//     "imagenes/imagen2.jpg",
//     "imagenes/imagen3.jpg",
//     "imagenes/imagen4.jpg",
//     "imagenes/imagen5.jpg",
//   ];

//   const slideWidth = 800; // anchura de una sola imagen
//   const slideCount = images.length;
//   const carouselWidth = slideWidth * slideCount;

//   return (
//     <div>
//       <div className="carousel">
//         <div
//           className="slides"
//           style={{ transform: `translateX(-${activeIndex * slideWidth}px)`, width: `${carouselWidth}px` }}
//         >
//           {images.map((image, index) => (
//             <div key={index} className="slide">
//               <img src={image} alt={`Slide ${index + 1}`} />
//             </div>
//           ))}
//         </div>
//         <button className="prev" onClick={handlePrev}>
//           &#10094;
//         </button>
//         <button className="next" onClick={handleNext}>
//           &#10095;
//         </button>
//       </div>
//       <div>
//         <Grid movies={movies} />
//       </div>
//     </div>
//   );
// }

// export default Home;