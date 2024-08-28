import React, { useEffect } from "react";
import "./carousel.css"; // Ensure this file contains the necessary styles for custom positioning

function Carousel() {
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpeg",
    "/images/4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {}, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide bg-black"
      data-bs-ride="carousel"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="carousel-inner">
        {images.map((src, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
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
      <div className="d-flex justify-content-center">
        <button
          className="custom-control-prev me-5"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="bi bi-arrow-left-circle custom-icon"></span>
        </button>
        <button
          className="custom-control-next ms-5"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="bi bi-arrow-right-circle custom-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
