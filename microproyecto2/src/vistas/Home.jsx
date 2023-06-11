import React, { useState, useEffect, useRef } from "react";


const images = [
  "imagenes/imagen1.jpg",
  "imagenes/imagen2.jpg",
  "imagenes/imagen3.jpg",
  "imagenes/imagen4.jpg",
  "imagenes/imagen5.jpg",
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

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

      {/* Aquí va el resto del contenido del homepage */}
    </div>
  );
}

export default Home;