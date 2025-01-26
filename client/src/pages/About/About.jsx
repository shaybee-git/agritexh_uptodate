import React from "react";
import "./About.css";
import Img1 from "../../Images/about/farmer-working.jpg";
import Img2 from "../../Images/about/equipment.jpg";
import Footer from "../../components/Footer/Footer";
const About = () => {
  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero-overlay"></div>
        <div className="aboutus-hero-content">
          <h1 className="aboutus-title animate-fadeIn">
            Welcome to The Farmer Portal
          </h1>
          <p className="aboutus-subtitle animate-fadeIn">
            Empowering farmers with the tools and resources they need to thrive
            in agriculture.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="aboutus-info">
        <div className="aboutus-info-text animate-slideIn">
          <h2>About Our Platform</h2>
          <p>
            The Farmer Portal for Seeds and Equipment Rental allows farmers to
            purchase seeds and fertilizers online. Farmers can conveniently
            browse through available products, compare prices, and place orders
            with an internet connection.
          </p>
          <p>
            Our platform aims to create a comprehensive system that facilitates
            efficient communication between farmers and suppliers, integrating
            real-time communication features and providing certified seeds and
            fertilizers.
          </p>
        </div>
        <div className="aboutus-info-image animate-zoomIn">
          <img src={Img1} alt="Farmer working in the field" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="aboutus-mission">
        <div className="aboutus-mission-text animate-slideIn">
          <h2>Our Mission</h2>
          <p>
            By providing valuable information about seeds and certified
            products, this portal empowers farmers to make informed decisions
            and streamline their agricultural practices. Our goal is to support
            farmers in enhancing productivity and sustainability in agriculture.
          </p>
        </div>
        <div className="aboutus-mission-image animate-zoomIn">
          <img src={Img2} alt="Agriculture equipment" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
