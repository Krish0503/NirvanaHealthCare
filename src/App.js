import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./components/SymptomChecker";
import PatientRecords from "./components/PatientRecords";
import HospitalLocator from "./components/HospitalLocator";
import VideoCall from "./components/VideoCall";
import "./styles/global.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/hospital-locator" element={<HospitalLocator />} />
        <Route path="/video-call" element={<VideoCall />} />
      </Routes>
      <Footer />
    </>
  );
  

}


export default App;
