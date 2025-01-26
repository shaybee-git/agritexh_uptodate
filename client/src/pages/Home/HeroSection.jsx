import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShopNowClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <h1 className="hero-title">Empowering Your Farming Journey</h1>
        <p className="hero-description">
          Discover high-quality seeds, fertilizers, and equipment to boost your
          farming success.
        </p>
        <button className="hero-cta-button" onClick={handleShopNowClick}>
          Shop Now
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Option</h2>
            <div className="modal-buttons">
              <Link to="/rental">
                <button className="modal-button">Rental</button>
              </Link>
              <Link to="/sale">
                <button className="modal-button">Sale</button>
              </Link>
            </div>
            <button className="modal-close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
