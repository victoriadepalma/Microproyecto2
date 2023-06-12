import { Route, Routes } from "react-router-dom";
import ProtectedAdminRoute from "../Routes/ProtectedAdminRoute";
import ProtectedRoute from "../Routes/ProtectedRoute";
import { UserAuth } from "../context/AuthContext";
import Home from "../components/Home.jsx";
import Peliculas from "../components/Peliculas.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { IniciarS } from "../components/IniciarS.jsx";
import Footer from "../components/Footer.jsx";
import Grid from "../components/Grid.jsx";
import { Signup } from "../components/Signup.jsx";
import { Login } from "../components/Login.jsx";
import { Info } from "../components/Info.jsx";
import Upcoming from "../components/Upcoming.jsx";
import { Reservar } from "../components/Reservar";


export const Router = () => {
  const { loading, user } = UserAuth();

  return (
    <>
      {!loading ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/movies/:movieId" element={<Info />} />
            <Route path="/movies/:movieId/tickets" element={<ProtectedRoute><Reservar /></ProtectedRoute>} />
            <Route path="/proximos-estrenos" element={<Upcoming />} />
          </Routes>

          <Footer />
        </>
      ) : null}
    </>
  );
};
