import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <h1><span className="brand-accent">N</span>irvana Healthcare</h1>
          </Link>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="navbar-links">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/doctors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Doctors</Link>
            <Link to="/symptom-checker" className="nav-link" onClick={() => setIsMenuOpen(false)}>Symptom Checker</Link>
            <Link to="/hospital-locator" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hospital Locator</Link>
          </div>
        </div>
      </nav>
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;

