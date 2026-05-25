import React from "react";
import "../styles/Dashboard.css";

const PatientRecords = () => {
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

  const appointmentHistory = [
    {
      id: 1,
      date: "2024-02-15",
      doctor: "Dr. Sarah Wilson",
      department: "Cardiology",
      status: "Completed",
      notes: "Regular checkup. All vitals normal.",
      nextVisit: "2024-05-15",
      precautions: [
        "Monitor blood pressure daily",
        "Reduce sodium intake",
        "Exercise 30 minutes daily"
      ]
    },
    {
      id: 2,
      date: "2024-01-20",
      doctor: "Dr. Michael Chen",
      department: "Endocrinology",
      status: "Completed",
      notes: "Diabetes management review. HbA1c improved.",
      nextVisit: "2024-04-20",
      precautions: [
        "Follow diabetic diet plan",
        "Check blood sugar levels twice daily",
        "Take medications as prescribed"
      ]
    },
    {
      id: 3,
      date: "2024-03-10",
      doctor: "Dr. Sarah Wilson",
      department: "Cardiology",
      status: "Scheduled",
      notes: "Follow-up for blood pressure assessment",
      nextVisit: null,
      precautions: ["Continue current medications", "Maintain exercise routine"]
    },
    {
      id: 4,
      date: "2024-03-25",
      doctor: "Dr. Emily Roberts",
      department: "General Medicine",
      status: "Scheduled",
      notes: "Annual comprehensive health screening",
      nextVisit: null,
      precautions: ["Fast for 12 hours before appointment", "Bring previous lab reports"]
    }
  ];

  return (
    <div className="dashboard-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="dashboard-header">
        <h1>Patient Records</h1>
        <p>Your complete medical history and appointments</p>
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
                <span className="department">{appointment.department}</span>
                <p className="notes">{appointment.notes}</p>
                {appointment.nextVisit && (
                  <p><strong>Next Visit:</strong> {appointment.nextVisit}</p>
                )}
                <div className="appointment-additional-info">
                  <h4>Precautions</h4>
                  <ul className="precautions">
                    {appointment.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
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
