import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Itha add pannunga
import "./Hero.css";

function Hero() {
  return (
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
      
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/hero1.webp" className="d-block w-100 hero-img" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="/hero2.webp" className="d-block w-100 hero-img" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="/hero3.webp" className="d-block w-100 hero-img" alt="Slide 3" />
        </div>
      </div>
    </div>
  );
}

export default Hero;