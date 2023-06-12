import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Grid.module.css";
import Peliculas from "./Peliculas";
import Grid from "./Grid";

function Upcoming() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const apiKey = "75f73a894a20e4ee1c51851645a6eae2";
        const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
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

      }, []);
  return (
    <div>
    <Grid movies={movies} genres={genres} />
  </div>
  );
  
}

export default Upcoming;