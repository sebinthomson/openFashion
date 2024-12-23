import React, { useEffect } from "react";
import "./carousel.css";
import { Carousel } from "bootstrap";

function CarouselComponent({
  images,

}) {
  useEffect(() => {
    const carouselElement = document.getElementById("carouselExampleInterval");
    const carousel = new Carousel(carouselElement, {
      interval: 1500,
      ride: "carousel",
    });
  }, []);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide bg-black"
      data-bs-ride="carousel"
      data-bs-interval="1500" 
      style={{ margin: 0, padding: 0 }}
    >
      <div className="carousel-inner">
        {images.map((src, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={src}
              className="d-block w-100 carousel-image"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* {eventName && (
        <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
          <h5 className="text-white">{eventName}</h5>
          <h5 className="text-white">{eventDate}</h5>
        </div>
      )} */}
      {images?.length > 1 ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default CarouselComponent;
