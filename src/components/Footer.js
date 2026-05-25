import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3><span className="footer-brand-accent">N</span>irvana Healthcare</h3>
          <p>Achieve Wellness, Attain Nirvana</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/symptom-checker">Symptom Checker</Link></li>
            <li><Link to="/patient-records">Records</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@nirvanahealthcare.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Nirvana Healthcare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;