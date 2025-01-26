import React from "react";
import "./Home.css";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="why-choose-us-content">
        <ul>
          <li>
            <i className="bi bi-check-circle"></i>
            <span>
              Access to certified seeds and fertilizers from top brands
            </span>
          </li>
          <li>
            <i className="bi bi-easel"></i>
            <span>Easy-to-use platform with intuitive navigation</span>
          </li>
          <li>
            <i className="bi bi-headset"></i>
            <span>24/7 customer support with knowledgeable experts</span>
          </li>
        </ul>
        <p className="additional-info">
          We are committed to supporting farmers and gardeners with high-quality
          products and services tailored to your needs. Whether you're a
          hobbyist or a professional, our platform is designed to make your
          agricultural endeavors successful.
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
