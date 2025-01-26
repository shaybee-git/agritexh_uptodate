// src/components/CallToAction.jsx
import React from "react";
import "./Home.css";

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <h2 className="call-to-action-title">Ready to Get Started?</h2>
      <a href="/sign-up" className="call-to-action-button">
        Join Us Today
      </a>
    </section>
  );
};

export default CallToAction;
