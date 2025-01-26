// src/components/FeaturedProducts.jsx
import React from "react";
import "./Home.css";
import ProductFeature from "../../Images/home/pfeature.webp";
import { Link } from "react-router-dom";
const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <div className="overlay"></div>
      <h2 className="featured-title">Featured Products</h2>
      <div className="featured-products-list">
        <div className="featured-product-item">
          <div className="featured-product-image-container">
            <img
              src={ProductFeature}
              alt="Premium Seeds"
              className="featured-product-image"
            />
          </div>
          <h3 className="featured-product-name">Premium Seeds</h3>
        </div>
        {/* Add more product items similarly */}
      </div>
    </section>
  );
};

export default FeaturedProducts;
