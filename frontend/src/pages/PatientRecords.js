import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const API_URL = "http://localhost:5000";

const PatientRecords = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="dashboard-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="dashboard-header">
        <h1>Patient Records</h1>
        <p>Your complete medical history and live appointment database</p>
      </div>

      <div className="dashboard-section">
        <h2>Medical History</h2>
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

      <div className="dashboard-section">
        <h2>Booked Appointments (Live DB)</h2>
        {loading ? (
          <p>Loading appointments from database...</p>
        ) : error ? (
          <p style={{ color: 'var(--danger)' }}>{error}</p>
        ) : appointments.length === 0 ? (
          <p>No appointments booked yet. Visit the Doctors tab to book one!</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-date">
                  <span className="date">{appointment.slot_time}</span>
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
