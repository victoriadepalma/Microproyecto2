import React, { useState, useEffect, useRef } from "react";
import Grid from "./Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faChevronRight,
  faChevronLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import img1 from "../imagenes/imagen1.jpg";
import img2 from "../imagenes/imagen2.jpg";
import img3 from "../imagenes/imagen3.jpg";
import img4 from "../imagenes/imagen4.jpg";
import img5 from "../imagenes/imagen5.jpg";
import { async } from "@firebase/util";

const images = [img1, img2, img3, img4, img5];

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 3000;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    console.log("prev");
  };
  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // useEffect(() => {
  //   setCurrentSlide(0);
  // }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  useEffect(() => {
    
    if (search.replace(" ", "") == "") {
      const apiKey = "75f73a894a20e4ee1c51851645a6eae2";
      const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
      const apiUrlGenres = "https://api.themoviedb.org/3/genre/movie/list";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWY3M2E4OTRhMjBlNGVlMWM1MTg1MTY0NWE2ZWFlMiIsInN1YiI6IjY0ODRhZGQyZTM3NWMwMDBlMjRmNTQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxnCI9Gk6c0CBo4WF22dobyisU71zygbIQkGrSQ8Ko4",
        },
      };

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setMovies(data.results))
        .then((data) => {
          fetch(apiUrlGenres, options)
            .then((res) => res.json())
            .then((json) => {
              setGenres(json.genres);
            })
            .catch((err) => console.error("error:" + err));
        })
        .catch((error) => console.log(error));
    }
  }, [page, search]);

  const next = () => {
    if (page < 500) {
      setPage(page + 1);
    }
  };
  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const filter = async (searchFilter) => {
    if (searchFilter.replace(" ", "") != "") {
      let aux = [];

      const apiKey = "75f73a894a20e4ee1c51851645a6eae2";
      for (let i = 1; i < 94; i++) {
        const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${i}`;
        const apiUrlGenres = "https://api.themoviedb.org/3/genre/movie/list";
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWY3M2E4OTRhMjBlNGVlMWM1MTg1MTY0NWE2ZWFlMiIsInN1YiI6IjY0ODRhZGQyZTM3NWMwMDBlMjRmNTQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxnCI9Gk6c0CBo4WF22dobyisU71zygbIQkGrSQ8Ko4",
          },
        };

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            let auxData = data.results;
            auxData = auxData.filter((element) => {
              return element.title
                .toLowerCase()
                .includes(searchFilter.toLowerCase());
            });
            aux = aux.concat(auxData);
            setMovies([...aux]);
          })
          .then((data) => {
            fetch(apiUrlGenres, options)
              .then((res) => res.json())
              .then((json) => {
                setGenres(json.genres);
              })
              .catch((err) => console.error("error:" + err));
          })
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <div>
      <div className="slider">
        <div className="slides">
          <>
            {images.map((image, index) => {
              return (
                <input
                  type="radio"
                  name="radio-btn"
                  id={`radio${index + 1}`}
                  checked={currentSlide == index}
                />
              );
            })}
          </>
          <>
            {images.map((image, index) => {
              if (index == 0) {
                return (
                  <div className="slide first">
                    <img src={image} />
                  </div>
                );
              } else {
                return (
                  <div className="slide">
                    {" "}
                    <img src={image} />
                  </div>
                );
              }
            })}
          </>
        </div>

        <div className="navigation-auto">
          {images.map((image, index) => {
            return <div className={`auto-btn${index + 1}`}></div>;
          })}
        </div>

        <div className="navigation-manual">
          {images.map((image, index) => {
            return (
              <label
                for={`radio${index + 1}`}
                className="manual-btn"
                onClick={() => {
                  setCurrentSlide(index);
                }}
              ></label>
            );
          })}
        </div>
      </div>
      <div>
        <div className="searchbar">
          <div className="search-container">
            <FontAwesomeIcon
              icon={faSearch}
              color="white"
              className="search-icon"
            />
          </div>
          <input
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              filter(e.target.value);
            }}
          />
        </div>
        <Grid movies={movies} genres={genres} />
        <div className="pages">
          <FontAwesomeIcon
            onClick={prev}
            className={page > 1 ? "arrow-left" : " arrow-left arrow-disabled"}
            icon={faChevronLeft}
            color="rgba(255,255,255,0.6)"
          />
          <FontAwesomeIcon
            onClick={next}
            className={page < 500 ? "arrow-right" : "arrow-disabled"}
            icon={faChevronRight}
            color="rgba(255,255,255,0.6)"
          />
        </div>
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


