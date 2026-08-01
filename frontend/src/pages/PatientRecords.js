import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const API_URL = "http://localhost:5000";

const PatientRecords = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentUser] = useState(() => {
    const saved = localStorage.getItem("nirvana_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [searchName, setSearchName] = useState(currentUser?.name || "");

  const medicalHistory = [
    {
      id: 1,
      condition: "Hypertension",
      diagnosedDate: "2020-03-15",
      status: "Controlled",
      medications: ["Lisinopril 10mg", "Amlodipine 5mg"],
      notes: "Regular monitoring required. Blood pressure well controlled with current medication."
    },
    {
      id: 2,
      condition: "Type 2 Diabetes",
      diagnosedDate: "2021-06-20",
      status: "Managed",
      medications: ["Metformin 500mg", "Glipizide 5mg"],
      notes: "HbA1c levels within target range. Continue current treatment plan."
    }
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/appointments`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Could not connect to database for live appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  /* ── Filter appointments by search name ── */
  const filteredAppointments = appointments.filter((app) =>
    searchName
      ? app.patient_name.toLowerCase().includes(searchName.toLowerCase())
      : true
  );

  /* ── Export records to downloadable file ── */
  const handleExportRecords = () => {
    const patientName = currentUser?.name || searchName || "Patient";
    let content = `====================================================\n`;
    content += `NIRVANA HEALTHCARE - OFFICIAL MEDICAL RECORDS SUMMARY\n`;
    content += `Generated Date: ${new Date().toLocaleDateString()}\n`;
    content += `Patient: ${patientName}\n`;
    content += `====================================================\n\n`;

    content += `[ MEDICAL HISTORY ]\n`;
    medicalHistory.forEach((item) => {
      content += `- Condition: ${item.condition} (${item.status})\n`;
      content += `  Diagnosed Date: ${item.diagnosedDate}\n`;
      content += `  Medications: ${item.medications.join(", ")}\n`;
      content += `  Notes: ${item.notes}\n\n`;
    });

    content += `[ BOOKED APPOINTMENTS (${filteredAppointments.length}) ]\n`;
    if (filteredAppointments.length === 0) {
      content += `No booked appointments found.\n`;
    } else {
      filteredAppointments.forEach((app) => {
        content += `- Appointment ID: #${app.id}\n`;
        content += `  Doctor: ${app.doctor_name || `Doctor #${app.doctor_id}`}\n`;
        content += `  Patient Name: ${app.patient_name}\n`;
        content += `  Slot Time: ${app.slot_time}\n`;
        content += `  Status: ${app.status}\n\n`;
      });
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Medical_Records_${patientName.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Header */}
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Patient Records & History</h1>
          <p>
            {currentUser
              ? `Showing authenticated records for ${currentUser.name}`
              : "Search patient records or sign in to view your account"}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!currentUser && (
            <Link to="/login" className="nav-login-btn" style={{ padding: '0.6rem 1.2rem', textDecoration: 'none' }}>
              Sign In to Patient Portal
            </Link>
          )}
          <button
            onClick={handleExportRecords}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-strong)',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            📥 Export Records (.txt)
          </button>
        </div>
      </div>

      {/* Patient Search Filter Bar */}
      <div className="med-tracker-card" style={{ margin: '1.5rem 0 2rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>🔍 Patient Filter:</span>
          <input
            type="text"
            placeholder="Type patient name to filter appointments..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '0.55rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-primary)',
              fontSize: '0.9rem'
            }}
          />
          {searchName && (
            <button
              onClick={() => setSearchName("")}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Medical History */}
      <div className="dashboard-section">
        <h2>Medical History & Conditions</h2>
        <div className="medical-history-list">
          {medicalHistory.map((condition) => (
            <div key={condition.id} className="medical-history-card">
              <div className="condition-header">
                <h3>{condition.condition}</h3>
                <span className={`status ${condition.status.toLowerCase()}`}>
                  {condition.status}
                </span>
              </div>
              <div className="condition-details">
                <p><strong>Diagnosed:</strong> {condition.diagnosedDate}</p>
                <p><strong>Medications:</strong> {condition.medications.join(", ")}</p>
                <p><strong>Notes:</strong> {condition.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Booked Appointments */}
      <div className="dashboard-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Booked Appointments (Live DB)</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {filteredAppointments.length} record(s) found
          </span>
        </div>

        {loading ? (
          <p>Loading appointments from database...</p>
        ) : error ? (
          <p style={{ color: 'var(--danger)' }}>{error}</p>
        ) : filteredAppointments.length === 0 ? (
          <div className="med-tracker-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              No appointments found {searchName ? `matching "${searchName}"` : ""}.
            </p>
            <Link to="/doctors" className="dl-card-book" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '0.6rem 1.5rem' }}>
              Book an Appointment Now
            </Link>
          </div>
        ) : (
          <div className="appointment-list">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-date">
                  <span className="date">⏰ {appointment.slot_time}</span>
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <h3>{appointment.doctor_name || `Doctor #${appointment.doctor_id}`}</h3>
                  <p className="notes"><strong>Patient Name:</strong> {appointment.patient_name}</p>
                  <p className="notes"><strong>Appointment ID:</strong> #{appointment.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
