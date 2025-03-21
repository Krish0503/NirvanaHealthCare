import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <h1>Nirvana Healthcare</h1>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/symptom-checker" className="nav-link">Symptom Checker</Link>
        <Link to="/patient-records" className="nav-link">Patient Records</Link>
        <Link to="/hospital-locator" className="nav-link">Hospitals</Link>
        <Link to="/video-call" className="nav-link">Video Call</Link>
      </div>

      <div className="navbar-actions">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
