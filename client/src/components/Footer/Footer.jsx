import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>AgriTech</h1>
          <p>Your one-stop platform for agricultural solutions.</p>
        </div>
        <div className="footer-links">
          <ul className="footer-link-list">
            <li>
              <a href="/about" className="footer-link">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="footer-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-social-media">
          <a href="https://facebook.com" className="footer-social-icon">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="footer-social-icon">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="footer-social-icon">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AgriTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
