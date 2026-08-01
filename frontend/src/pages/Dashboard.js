import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const [appointmentCount, setAppointmentCount] = useState(0);

  /* ── Interactive Medicine Reminders (stored in localStorage) ── */
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem("nirvana_medications");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Amlodipine 5mg", time: "08:00 AM", taken: false },
          { id: 2, name: "Metformin 500mg", time: "01:00 PM", taken: true },
          { id: 3, name: "Multivitamin", time: "08:00 PM", taken: false },
        ];
  });

  const [newMedName, setNewMedName] = useState("");
  const [newMedTime, setNewMedTime] = useState("");

  /* ── Save medications to localStorage ── */
  useEffect(() => {
    localStorage.setItem("nirvana_medications", JSON.stringify(medications));
  }, [medications]);

  /* ── Fetch live appointment count ── */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/appointments`);
        setAppointmentCount(res.data.length);
      } catch (err) {
        console.warn("Backend offline — using default stats count");
      }
    };
    fetchStats();
  }, []);

  const toggleMedication = (id) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med))
    );
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedTime) return;
    const newMed = {
      id: Date.now(),
      name: newMedName.trim(),
      time: newMedTime,
      taken: false,
    };
    setMedications((prev) => [...prev, newMed]);
    setNewMedName("");
    setNewMedTime("");
  };

  const handleDeleteMedication = (id) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-container" style={{ paddingTop: "var(--navbar-height)" }}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="greeting-section">
          <h1>{getGreeting()}, Patient 👋</h1>
          <p>Here is your personal health metrics & daily medication overview</p>
        </div>
      </div>

      {/* Live Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-number">{appointmentCount}</span>
            <span className="stat-label">Booked Appointments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💊</div>
          <div className="stat-info">
            <span className="stat-number">{medications.length}</span>
            <span className="stat-label">Daily Medications</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-number">
              {medications.filter((m) => m.taken).length} / {medications.length}
            </span>
            <span className="stat-label">Doses Taken Today</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🩺</div>
          <div className="stat-info">
            <span className="stat-number">15</span>
            <span className="stat-label">Specialist Doctors</span>
          </div>
        </div>
      </div>

      {/* Interactive Medicine Tracker */}
      <div className="dashboard-section">
        <h2>💊 Interactive Daily Medicine Tracker</h2>
        <div className="med-tracker-card">
          <form onSubmit={handleAddMedication} className="med-add-form">
            <input
              type="text"
              placeholder="Medicine name (e.g. Paracetamol 500mg)"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Schedule Time (e.g. 09:00 AM)"
              value={newMedTime}
              onChange={(e) => setNewMedTime(e.target.value)}
            />
            <button type="submit" disabled={!newMedName.trim() || !newMedTime}>
              + Add Reminder
            </button>
          </form>

          <div className="med-list">
            {medications.length === 0 ? (
              <p className="med-empty">No medicine reminders added yet.</p>
            ) : (
              medications.map((med) => (
                <div key={med.id} className={`med-item ${med.taken ? "med-taken" : ""}`}>
                  <div className="med-info" onClick={() => toggleMedication(med.id)}>
                    <input
                      type="checkbox"
                      checked={med.taken}
                      onChange={() => toggleMedication(med.id)}
                    />
                    <div>
                      <span className="med-name">{med.name}</span>
                      <span className="med-time">⏰ {med.time}</span>
                    </div>
                  </div>
                  <button
                    className="med-del-btn"
                    onClick={() => handleDeleteMedication(med.id)}
                    title="Delete Reminder"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Navigation Actions */}
      <div className="dashboard-section">
        <h2>⚡ Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/doctors" className="action-button">
            <span className="action-icon">👨‍⚕️</span>
            <span>Book Doctor</span>
          </Link>
          <Link to="/symptom-checker" className="action-button">
            <span className="action-icon">🩺</span>
            <span>AI Symptom Checker</span>
          </Link>
          <Link to="/patient-records" className="action-button">
            <span className="action-icon">📋</span>
            <span>Medical Records</span>
          </Link>
          <Link to="/hospital-locator" className="action-button">
            <span className="action-icon">🏥</span>
            <span>Find Hospital</span>
          </Link>
          <Link to="/video-call" className="action-button">
            <span className="action-icon">📹</span>
            <span>Video Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;