import React, {useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import './Info.css';
import { db, auth, googleProvider } from "../components/firebase";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

export const Info = () => {
   const[movie, setMovie]=useState(null)
   const navigate = useNavigate();
   const [sold, setSold] = useState(0);
   const [liked, setLiked] = useState(false);
   const {movieId}=useParams()
   const { user } = UserAuth();
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
      .then(json => {console.log(json);setMovie(json)})
      .catch(err => console.error('error:' + err));
  }, []);

  useEffect(() => {
    getReservas()
    getLiked()
  }, []);

  const getReservas = async () => {
    const q = query(
      collection(db, "reservas"),
      where("movieId", "==", movieId)
    );

    const querySnapshot = await getDocs(q);
    let quantity=0
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     
      const numberOfSeats = Number(doc.data().seats.length);
      quantity+=numberOfSeats
      
    });
    setSold(quantity);
  };

  const getLiked = async () => {
    const q = query(
      collection(db, "likes"),
      where("movieId", "==", movieId),where("userID", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     console.log(doc.data())
     setLiked(doc.data().liked)
      
    });
   
  };

  const like = async () => {

    try {
      await addDoc(collection(db, "likes"), {
        movieId,
        userID: user.uid,
        liked:true,
      });
    
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
    {movie != null ? (
      <div className="info-imagen">
        <img
          className="foto"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div className="descripcion-container">
          {user !=null &&
        <FontAwesomeIcon
        onClick={()=>{if(liked==false){setLiked(true);like()}}}
                      icon={faHeart}
                      className="like"
                        color={liked ? "#c20114" :"rgba(255,255,255,0.6)"}
                      />
          }
          <h2>{movie.title}</h2>
          <div className="descripcion">
            <p id = "idioma">Idioma: {movie.original_language}</p>
            <p>Sinopsis: {movie.overview}</p>
            <p>Popularidad: {movie.popularity}</p>
            <p>Fecha de Estreno: {movie.release_date}</p>
          </div>
          {movie.status == "Released" && new Date(movie.release_date) <= new Date() ?
          <>
          {sold < 20 ?
          <button onClick={()=>{navigate(`/movies/${movieId}/tickets`)}} className="button-reservar">Reservar</button>
          :    <button className="button-release" disabled={true}>Agotado</button>}
          </>
          :
          <button className="button-release" disabled={true}>Fecha de estreno: {movie.release_date}</button>}
        </div>
      </div>
    ) : (
      <div>No se ha encontrado información</div>
    )}
  </div>
  );
}