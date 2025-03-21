import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Nirvana Healthcare</h1>
        <p>Your trusted partner in healthcare management</p>
        <div className="hero-buttons">
          <Link to="/dashboard" className="primary-button">Go to Dashboard</Link>
          <Link to="/symptom-checker" className="secondary-button">Check Symptoms</Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Health Dashboard</h3>
            <p>Track your health metrics and appointments in one place</p>
          </div>
          <div className="feature-card">
            <h3>Symptom Checker</h3>
            <p>Get instant health advice based on your symptoms</p>
          </div>
          <div className="feature-card">
            <h3>Patient Records</h3>
            <p>Access your medical history and test results</p>
          </div>
          <div className="feature-card">
            <h3>Video Consultation</h3>
            <p>Connect with healthcare providers remotely</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;