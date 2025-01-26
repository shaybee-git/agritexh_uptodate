import React from "react";
import "./Home.css";
import profilePic from "../../Images/home/pf1.jpg";
const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonials-list">
        <div className="testimonial">
          <img src={profilePic} alt="John Doe" className="testimonial-avatar" />
          <p className="testimonial-quote">
            "Great platform for all my farming needs!"
          </p>
          <h4 className="testimonial-name">John Doe</h4>
        </div>
        {/* Add more testimonials similarly */}
      </div>
    </section>
  );
};

export default Testimonials;
