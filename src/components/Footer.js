import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nirvana Healthcare</h3>
          <p>Achieve Wellness, Attain Nirvana</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/symptom-checker">Symptom Checker</a></li>
            <li><a href="/patient-records">Patient Records</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
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