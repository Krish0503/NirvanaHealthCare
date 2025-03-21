import React from "react";
import "../styles/Dashboard.css";

const PatientRecords = () => {
  // Sample medical history data
  const medicalHistory = [
    {
      id: 1,
      condition: "Hypertension",
      diagnosedDate: "2022-05-15",
      status: "Controlled",
      medications: ["Lisinopril 10mg", "Amlodipine 5mg"],
      notes: "Regular monitoring required"
    },
    {
      id: 2,
      condition: "Type 2 Diabetes",
      diagnosedDate: "2021-08-20",
      status: "Managed",
      medications: ["Metformin 500mg", "Glimepiride 2mg"],
      notes: "Blood sugar monitoring daily"
    }
  ];

  // Sample appointment data with enhanced information
  const appointmentHistory = [
    {
      id: 1,
      date: "2024-03-20",
      doctor: "Dr. Sarah Smith",
      department: "Cardiology",
      status: "Completed",
      notes: "Regular checkup - All vitals normal",
      nextVisit: "2024-06-20",
      precautions: [
        "Continue daily blood pressure monitoring",
        "Maintain low-sodium diet",
        "Exercise 30 minutes daily"
      ]
    },
    {
      id: 2,
      date: "2024-03-15",
      doctor: "Dr. Michael Johnson",
      department: "Orthopedics",
      status: "Completed",
      notes: "Follow-up for knee pain",
      nextVisit: "2024-04-15",
      precautions: [
        "Avoid strenuous activities",
        "Continue physical therapy exercises",
        "Use knee brace during activities"
      ]
    },
    {
      id: 3,
      date: "2024-03-10",
      doctor: "Dr. Emily Brown",
      department: "General Medicine",
      status: "Completed",
      notes: "Annual health checkup",
      nextVisit: "2025-03-10",
      precautions: [
        "Maintain healthy diet",
        "Regular exercise",
        "Annual blood work required"
      ]
    },
    {
      id: 4,
      date: "2024-04-01",
      doctor: "Dr. David Wilson",
      department: "Dermatology",
      status: "Scheduled",
      notes: "Skin condition follow-up",
      nextVisit: "2024-05-01",
      precautions: [
        "Continue prescribed cream application",
        "Avoid direct sun exposure",
        "Use SPF 50+ sunscreen"
      ]
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Patient Records</h1>
        <p>View your medical history and appointments</p>
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
        <h2>Appointment History</h2>
        <div className="appointment-list">
          {appointmentHistory.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-date">
                <span className="date">{appointment.date}</span>
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>
              <div className="appointment-details">
                <h3>{appointment.doctor}</h3>
                <p className="department">{appointment.department}</p>
                <p className="notes">{appointment.notes}</p>
                <div className="appointment-additional-info">
                  <p><strong>Next Visit:</strong> {appointment.nextVisit}</p>
                  <div className="precautions">
                    <strong>Precautions:</strong>
                    <ul>
                      {appointment.precautions.map((precaution, index) => (
                        <li key={index}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
