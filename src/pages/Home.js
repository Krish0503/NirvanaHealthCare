import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container" style={{ paddingTop: "var(--navbar-height)" }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-blob hero-blob--1"></div>
          <div className="hero-blob hero-blob--2"></div>
          <div className="hero-blob hero-blob--3"></div>
        </div>
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Experience healthcare reimagined with cutting-edge technology and compassionate care. Your wellness journey starts here.</p>
          <div className="hero-buttons">
            <Link to="/appointments" className="primary-button">Book Appointment</Link>
            <Link to="/hospital-locator" className="secondary-button">Find Hospital</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600" alt="Healthcare" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <Link to="/hospital-locator" className="feature-card" style={{ animationDelay: "0s" }}>
            <span className="feature-icon">🏥</span>
            <h3>Find Hospitals</h3>
            <p>Locate nearby hospitals and clinics with ease</p>
          </Link>
          <Link to="/appointments" className="feature-card" style={{ animationDelay: "0.1s" }}>
            <span className="feature-icon">📅</span>
            <h3>Book Appointments</h3>
            <p>Schedule appointments with top healthcare providers</p>
          </Link>
          <Link to="/dashboard" className="feature-card" style={{ animationDelay: "0.2s" }}>
            <span className="feature-icon">💊</span>
            <h3>Medicine Reminder</h3>
            <p>Never miss your medications with smart reminders</p>
          </Link>
          <Link to="/video-call" className="feature-card" style={{ animationDelay: "0.3s" }}>
            <span className="feature-icon">📹</span>
            <h3>Video Consultation</h3>
            <p>Connect with doctors from the comfort of your home</p>
          </Link>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="health-tips-section">
        <h2>Health Tips</h2>
        <div className="health-tips-grid">
          <div className="health-tip-card">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" alt="Stay Hydrated" />
            <div className="tip-content">
              <h3>Stay Hydrated</h3>
              <p>Drink at least 8 glasses of water daily to maintain optimal health.</p>
            </div>
          </div>
          <div className="health-tip-card">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" alt="Exercise" />
            <div className="tip-content">
              <h3>Regular Exercise</h3>
              <p>30 minutes of daily exercise can significantly improve your health.</p>
            </div>
          </div>
          <div className="health-tip-card">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400" alt="Balanced Diet" />
            <div className="tip-content">
              <h3>Balanced Diet</h3>
              <p>Include fruits, vegetables, and whole grains in your daily diet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="emergency-section">
        <div className="emergency-content">
          <span className="emergency-icon">🚑</span>
          <h2>Emergency Services</h2>
          <p>24/7 emergency services available at your fingertips</p>
          <Link to="/emergency" className="emergency-button">Get Emergency Help</Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for health tips and updates</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;