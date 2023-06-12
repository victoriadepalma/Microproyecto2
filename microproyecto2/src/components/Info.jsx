import React, {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import './Info.css';

export const Info = () => {
   const[movie, setMovie]=useState(null)
   const {movieId}=useParams()
   useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWY3M2E4OTRhMjBlNGVlMWM1MTg1MTY0NWE2ZWFlMiIsInN1YiI6IjY0ODRhZGQyZTM3NWMwMDBlMjRmNTQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxnCI9Gk6c0CBo4WF22dobyisU71zygbIQkGrSQ8Ko4'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovie(json))
      .catch(err => console.error('error:' + err));
  }, []);
  return (
    <div>
    {movie != null ? (
      <div className="info-imagen">
        <img
          className="foto"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div className="descripcion-container">
          <h2>{movie.title}</h2>
          <div className="descripcion">
            <p id = "idioma">Idioma: {movie.original_language}</p>
            <p>Sinopsis: {movie.overview}</p>
            <p>Popularidad: {movie.popularity}</p>
            <p>Fecha de Estreno: {movie.release_date}</p>
          </div>
        </div>
      </div>
    ) : (
      <div>No se ha encontrado información</div>
    )}
  </div>
  );
}