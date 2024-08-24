import React, { useEffect } from "react";
import './carousel.css'; // Import the CSS file

function Carousel() {
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpeg",
    "/images/4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Bootstrap carousel automatically handles image switching
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="carousel-inner">
        {images.map((src, index) => (
          <div
            key={index}
            className={`carousel-item w-100 ${index === 0 ? "active" : ""}`}
            data-bs-interval="2000"
          >
            <img
              src={src}
              className="d-block w-100 carousel-image"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default Carousel;
