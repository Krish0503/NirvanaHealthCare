import React from "react";
import "../styles/Dashboard.css";

const PatientRecords = () => {
  // Sample appointment data - in a real app, this would come from an API
  const appointmentHistory = [
    {
      id: 1,
      date: "2024-03-20",
      doctor: "Dr. Sarah Smith",
      department: "Cardiology",
      status: "Completed",
      notes: "Regular checkup - All vitals normal"
    },
    {
      id: 2,
      date: "2024-03-15",
      doctor: "Dr. Michael Johnson",
      department: "Orthopedics",
      status: "Completed",
      notes: "Follow-up for knee pain"
    },
    {
      id: 3,
      date: "2024-03-10",
      doctor: "Dr. Emily Brown",
      department: "General Medicine",
      status: "Completed",
      notes: "Annual health checkup"
    },
    {
      id: 4,
      date: "2024-04-01",
      doctor: "Dr. David Wilson",
      department: "Dermatology",
      status: "Scheduled",
      notes: "Skin condition follow-up"
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Patient Records</h1>
        <p>View your medical history and appointments</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
