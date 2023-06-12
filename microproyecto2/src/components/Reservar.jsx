import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faChair } from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "../context/AuthContext";
import { db, auth, googleProvider } from "../components/firebase";
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

export const Reservar = () => {
  const navigate=useNavigate()
  const [movie, setMovie] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [numTickets, setNumTickets] = useState(0);
  const [sold, setSold] = useState(0);
  const [step, setStep] = useState(1);
  const { movieId } = useParams();
  const { user } = UserAuth();

  const [reservas, setReservas] = useState([
    [true, true, true, true,true],
    [true, true, true, true,true],
    [true, true, true, true,true],
    [true, true, true, true,true],
  ]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWY3M2E4OTRhMjBlNGVlMWM1MTg1MTY0NWE2ZWFlMiIsInN1YiI6IjY0ODRhZGQyZTM3NWMwMDBlMjRmNTQwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zxnCI9Gk6c0CBo4WF22dobyisU71zygbIQkGrSQ8Ko4",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMovie(json);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  useEffect(() => {
    getReservas();
  }, []);

  const add = () => {
    console.log('cdcdcdd',sold)
    if (numTickets < 5 && sold+numTickets <20) {
      setNumTickets(numTickets + 1);
    }
  };
  const minus = () => {
    if (numTickets > 0) {
      setNumTickets(numTickets - 1);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const chooseSeat = (row, seat) => {
   
    if (
      reservas[row][seat] != null &&
      reservas[row][seat] != false &&
      seats.length <= numTickets - 1
    ) {
     
      const aux = reservas;
      aux[row][seat] = null;
      let aux1 = seats;
      aux1.push(row.toString() + seat.toString());
      setSeats(aux1);
      setReservas([...aux]);
    } else if (reservas[row][seat] == null) {
      const aux = reservas;
      aux[row][seat] = true;
      let aux1 = seats;

      const index = aux1.indexOf(row.toString() + seat.toString());
      if (index > -1) {
        // only splice array when item is found
        aux1.splice(index, 1); // 2nd parameter means remove one item only
      }
      console.log(aux1);
      setSeats(aux1);
      setReservas([...aux]);
    }
  };

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
      const aux = reservas;
      const seatAux = doc.data().seats;
      for (let i = 0; i < seatAux.length; i++) {
        let row = Number(seatAux[i].charAt(0));
        let seatNum = Number(seatAux[i].charAt(1));
        const aux = reservas;
        aux[row][seatNum] = false;
        setReservas([...aux]);
      }
      console.log(sold + numberOfSeats);
      quantity+=numberOfSeats
      
    });
    setSold(quantity);
  };
  
  const reservar = async () => {
    console.log(movieId, user.uid, seats);
    try {
      await addDoc(collection(db, "reservas"), {
        movieId,
        userID: user.uid,
        seats,
      });
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {movie != null ? (
        <>
          <div className="info-imagen">
            <img
              className="foto"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />{" "}
            {movie.status == "Released" &&
            new Date(movie.release_date) <= new Date() ? (
              <>
                {step == 1 && (
                  <div className="descripcion-container">
                    <h2>{movie.title}</h2>
                    <h3>Tickets</h3>
                    <div className="tickets">
                      <FontAwesomeIcon
                        onClick={minus}
                        className={
                          numTickets > 0 ? "icon-minus" : "icon-disabled"
                        }
                        icon={faMinus}
                        color="rgba(255,255,255,0.6)"
                      />
                      <div>
                        <p>{numTickets}</p>
                      </div>
                      <FontAwesomeIcon
                        onClick={add}
                        className={
                          numTickets < 5 && sold+numTickets <=20 ? "icon-minus" : "icon-disabled"
                        }
                        icon={faPlus}
                        color="rgba(255,255,255,0.6)"
                      />
                    </div>
                    <button
                      onClick={nextStep}
                      disabled={numTickets == 0}
                      className={
                        numTickets > 0 ? "button-reservar" : "button-release"
                      }
                    >
                      Continuar
                    </button>
                  </div>
                )}
                {step == 2 && (
                  <div className="descripcion-container">
                    <div className="seats-container">
                      {reservas.map((reserva, row) => {
                        return (
                          <div className="row">
                            <div className="row-number">{row}</div>
                            {reserva.map((seat, index) => {
                              return (
                                <FontAwesomeIcon
                                  onClick={() => {
                                    chooseSeat(row, index);
                                  }}
                                  disabled={!seat || numTickets == seats.length}
                                  icon={faChair}
                                  color={
                                    seat == true
                                      ? "#c20114"
                                      : seat == null
                                      ? "rgba(255, 255, 255, 0.6)"
                                      : "#242424"
                                  }
                                  className={
                                    seat || numTickets > seats.length
                                      ? "seat-icon"
                                      : "seat-icon disabled-seat"
                                  }
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={reservar}
                      disabled={numTickets > seats.length}
                      className={
                        numTickets == seats.length
                          ? "button-reservar"
                          : "button-release"
                      }
                    >
                      Reservar
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="descripcion-container">
                <h2>Fecha de Estreno: {movie.release_date}</h2>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>No se ha encontrado información</div>
      )}
    </div>
  );
};
