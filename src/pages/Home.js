import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const features = [
    {
      icon: '🏥',
      title: 'Find Hospitals',
      description: 'Locate nearby hospitals and healthcare facilities with detailed information and ratings.',
      link: '/hospital-locator'
    },
    {
      icon: '👨‍⚕️',
      title: 'Book Appointments',
      description: 'Schedule appointments with healthcare providers easily and manage your medical visits.',
      link: '/appointments'
    },
    {
      icon: '💊',
      title: 'Medicine Reminder',
      description: 'Set up medication reminders and track your prescriptions.',
      link: '/medicine-reminder'
    },
    {
      icon: '📱',
      title: 'Video Consultation',
      description: 'Connect with doctors through secure video calls for remote medical consultations.',
      link: '/video-consultation'
    }
  ];

  const healthTips = [
    {
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain good health.',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Regular Exercise',
      description: '30 minutes of daily exercise can significantly improve your health.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Balanced Diet',
      description: 'Maintain a balanced diet rich in fruits, vegetables, and whole grains.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Access quality healthcare services anytime, anywhere with Nirvana Healthcare</p>
          <div className="hero-buttons">
            <Link to="/appointments" className="primary-button">Book Appointment</Link>
            <Link to="/hospital-locator" className="secondary-button">Find Hospitals</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60" alt="Healthcare" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="health-tips-section">
        <h2>Health Tips</h2>
        <div className="health-tips-grid">
          {healthTips.map((tip, index) => (
            <div key={index} className="health-tip-card">
              <img src={tip.image} alt={tip.title} />
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Section */}
      <section className="emergency-section">
        <div className="emergency-content">
          <h2>Need Emergency Care?</h2>
          <p>24/7 Emergency Services Available</p>
          <Link to="/emergency" className="emergency-button">
            <span className="emergency-icon">🚑</span>
            Call Emergency Services
          </Link>
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