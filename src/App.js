import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PatientRecords from "./pages/PatientRecords";
import SymptomChecker from "./pages/SymptomChecker";
import HospitalLocator from "./pages/HospitalLocator";
import VideoCall from "./pages/VideoCall";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/records" element={<PatientRecords />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/hospital-locator" element={<HospitalLocator />} />
          <Route path="/video-call" element={<VideoCall />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


