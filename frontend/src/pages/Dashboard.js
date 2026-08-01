import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const healthMetrics = {
    appointments: 3,
    prescriptions: 5,
    upcomingTests: 2,
    notifications: 4
  };

  const patientProfile = {
    name: "John Doe",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    lastVisit: "2024-02-15",
    primaryDoctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    contact: "+1 (555) 123-4567",
    email: "john.doe@email.com"
  };

  const doctorProfile = {
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    experience: "15 years",
    education: "MD - Harvard Medical School",
    availability: "Mon - Fri, 9:00 AM - 5:00 PM",
    rating: 4.8,
    patients: 1200,
    image: "https://via.placeholder.com/150"
  };

  const recentActivities = [
    { date: "2024-02-15", activity: "Completed annual health checkup" },
    { date: "2024-02-10", activity: "Prescription renewed for blood pressure medication" },
    { date: "2024-02-05", activity: "Lab results received - All within normal range" }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="dashboard-header">
        <div className="greeting-section">
          <h1>{getGreeting()}, {patientProfile.name} 👋</h1>
          <p>Here's your health overview for today</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-number">{healthMetrics.appointments}</span>
            <span className="stat-label">Appointments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💊</div>
          <div className="stat-info">
            <span className="stat-number">{healthMetrics.prescriptions}</span>
            <span className="stat-label">Prescriptions</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔬</div>
          <div className="stat-info">
            <span className="stat-number">{healthMetrics.upcomingTests}</span>
            <span className="stat-label">Upcoming Tests</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <span className="stat-number">{healthMetrics.notifications}</span>
            <span className="stat-label">Notifications</span>
          </div>
        </div>
      </div>

      <div className="dashboard-section profile-section">
        <h2>Patient Profile</h2>
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-header">
              <h3>{patientProfile.name}</h3>
              <span className="age">{patientProfile.age} years | {patientProfile.gender}</span>
            </div>
            <div className="profile-details">
              <p><strong>Blood Group:</strong> {patientProfile.bloodGroup}</p>
              <p><strong>Last Visit:</strong> {patientProfile.lastVisit}</p>
              <p><strong>Primary Doctor:</strong> {patientProfile.primaryDoctor}</p>
              <p><strong>Department:</strong> {patientProfile.department}</p>
              <p><strong>Contact:</strong> {patientProfile.contact}</p>
              <p><strong>Email:</strong> {patientProfile.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section doctor-section">
        <h2>Your Doctor</h2>
        <div className="doctor-card">
          <div className="doctor-info">
            <div className="doctor-header">
              <h3>{doctorProfile.name}</h3>
              <span className="specialization">{doctorProfile.specialization}</span>
            </div>
            <div className="doctor-details">
              <p><strong>Experience:</strong> {doctorProfile.experience}</p>
              <p><strong>Education:</strong> {doctorProfile.education}</p>
              <p><strong>Availability:</strong> {doctorProfile.availability}</p>
              <p><strong>Patients Treated:</strong> {doctorProfile.patients}+</p>
              <p className="rating">⭐ {doctorProfile.rating} / 5.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/symptom-checker" className="action-button">
            <span className="action-icon">🩺</span>
            <span>Symptom Checker</span>
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
            <span>Video Call</span>
          </Link>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activities-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <span className="activity-date">{activity.date}</span>
              <span className="activity-description">{activity.activity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Health Reminders</h2>
        <div className="reminders-list">
          <div className="reminder-item">
            <span className="reminder-icon">💊</span>
            <div>
              <h4>Medication Due</h4>
              <p>Take blood pressure medication at 8:00 PM</p>
            </div>
          </div>
          <div className="reminder-item">
            <span className="reminder-icon">📋</span>
            <div>
              <h4>Upcoming Check-up</h4>
              <p>Annual physical examination on March 15, 2024</p>
            </div>
          </div>
          <div className="reminder-item">
            <span className="reminder-icon">💉</span>
            <div>
              <h4>Vaccination Reminder</h4>
              <p>Flu shot due next month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;