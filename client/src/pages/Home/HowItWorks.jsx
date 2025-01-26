import React from "react";
import "./Home.css";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="decorative-circle circle1"></div>
      <div className="decorative-circle circle2"></div>
      <div className="decorative-circle circle3"></div>
      <div className="overlay"></div>
      <div className="container">
        <h2 className="how-it-works-title">How It Works</h2>
        <div className="row how-it-works-steps">
          <div className="col-12 col-md-6 col-lg-3 how-it-works-step">
            <i className="bi bi-search how-it-works-icon"></i>
            <h3 className="how-it-works-step-title">Browse Products</h3>
            <p className="how-it-works-step-description">
              Explore a wide range of seeds, fertilizers, and equipment.
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-3 how-it-works-step">
            <i className="bi bi-bag how-it-works-icon"></i>
            <h3 className="how-it-works-step-title">Place an Order</h3>
            <p className="how-it-works-step-description">
              Choose your products and place an order with ease.
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-3 how-it-works-step">
            <i className="bi bi-gear how-it-works-icon"></i>
            <h3 className="how-it-works-step-title">Rent Equipment</h3>
            <p className="how-it-works-step-description">
              Rent agricultural equipment to enhance your farming operations.
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-3 how-it-works-step">
            <i className="bi bi-people how-it-works-icon"></i>
            <h3 className="how-it-works-step-title">Connect with Suppliers</h3>
            <p className="how-it-works-step-description">
              Get in touch with trusted suppliers for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
