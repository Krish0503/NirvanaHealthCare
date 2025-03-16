import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Nirvana Healthcare</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/symptom-checker">Symptom Checker</Link></li>
        <li><Link to="/hospital-locator">Hospitals</Link></li>
        <li><Link to="/video-call">Video Call</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
