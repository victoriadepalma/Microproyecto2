import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Grid.module.css";
import Grid from "./Grid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function Peliculas() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const apiKey = "75f73a894a20e4ee1c51851645a6eae2";
        const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
        const apiUrlGenres = "https://api.themoviedb.org/3/genre/movie/list";
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWY3M2E4OTRhMjBlNGVlMWM1MTg1MTY0NWE2ZWFlMiIsInN1YiI6IjY0ODRhZGQyZTM3NWMwMDBlMjRmNTQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxnCI9Gk6c0CBo4WF22dobyisU71zygbIQkGrSQ8Ko4",
          },
        };
    
        fetch(apiUrl,options)
          .then((response) => response.json())
          .then((data) => {
            let aux=data.results
            setMovies(data.results)
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

      }, [page]);

      const next=()=>{
        if(page<500){
          setPage(page+1)
        }
      }
      const prev=()=>{
        if(page>1){
          setPage(page-1)
        }
      }
  return (
    <div>
    <Grid movies={movies} genres={genres} />
    <div className="pages"> 
    <FontAwesomeIcon  onClick={prev} className={page > 1 ? 'arrow-left':" arrow-left arrow-disabled"} icon={faChevronLeft} color="rgba(255,255,255,0.6)"/>
    <FontAwesomeIcon  onClick={next} className={page < 500 ? 'arrow-right':"arrow-disabled" } icon={faChevronRight} color="rgba(255,255,255,0.6)"/>
    </div>

  </div>
  );
  
}

export default Peliculas;