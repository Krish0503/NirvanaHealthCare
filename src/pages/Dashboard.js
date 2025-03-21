import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API
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
    lastVisit: "2024-03-20",
    primaryDoctor: "Dr. Sarah Smith",
    department: "Cardiology",
    contact: "+1 (555) 123-4567",
    email: "john.doe@email.com"
  };

  const doctorProfile = {
    name: "Dr. Sarah Smith",
    specialization: "Cardiologist",
    experience: "15 years",
    education: "MD, Harvard Medical School",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    rating: 4.8,
    patients: 1200,
    image: "https://example.com/doctor-image.jpg"
  };

  const recentActivities = [
    { date: '2024-03-20', activity: 'Blood Test Results Received' },
    { date: '2024-03-19', activity: 'Doctor Appointment - Dr. Smith' },
    { date: '2024-03-18', activity: 'Prescription Renewed' }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-container">
      {/* Greeting Section */}
      <div className="dashboard-header">
        <div className="greeting-section">
          <h1>{getGreeting()}, {patientProfile.name}!</h1>
          <p>Here's your health overview for today</p>
        </div>
      </div>

      {/* Patient Profile Section */}
      <div className="dashboard-section profile-section">
        <h2>Patient Profile</h2>
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-header">
              <h3>{patientProfile.name}</h3>
              <span className="age">{patientProfile.age} years</span>
            </div>
            <div className="profile-details">
              <p><strong>Gender:</strong> {patientProfile.gender}</p>
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

      {/* Doctor Profile Section */}
      <div className="dashboard-section doctor-section">
        <h2>Primary Care Physician</h2>
        <div className="doctor-card">
          <div className="doctor-info">
            <div className="doctor-header">
              <h3>{doctorProfile.name}</h3>
              <span className="rating">⭐ {doctorProfile.rating}</span>
            </div>
            <div className="doctor-details">
              <p><strong>Specialization:</strong> {doctorProfile.specialization}</p>
              <p><strong>Experience:</strong> {doctorProfile.experience}</p>
              <p><strong>Education:</strong> {doctorProfile.education}</p>
              <p><strong>Availability:</strong> {doctorProfile.availability}</p>
              <p><strong>Total Patients:</strong> {doctorProfile.patients}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-section stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Upcoming Appointments</h3>
            <p className="stat-number">{healthMetrics.appointments}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💊</div>
          <div className="stat-info">
            <h3>Active Prescriptions</h3>
            <p className="stat-number">{healthMetrics.prescriptions}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔬</div>
          <div className="stat-info">
            <h3>Pending Tests</h3>
            <p className="stat-number">{healthMetrics.upcomingTests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>New Notifications</h3>
            <p className="stat-number">{healthMetrics.notifications}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/symptom-checker" className="action-button">
            <span className="action-icon">🔍</span>
            Check Symptoms
          </Link>
          <Link to="/records" className="action-button">
            <span className="action-icon">📋</span>
            View Records
          </Link>
          <Link to="/hospital-locator" className="action-button">
            <span className="action-icon">🏥</span>
            Find Hospitals
          </Link>
          <Link to="/video-call" className="action-button">
            <span className="action-icon">📹</span>
            Video Consultation
          </Link>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="dashboard-section">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-date">{activity.date}</div>
              <div className="activity-description">{activity.activity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Reminders */}
      <div className="dashboard-section">
        <h2>Health Reminders</h2>
        <div className="reminders-list">
          <div className="reminder-item">
            <span className="reminder-icon">💊</span>
            <span>Take medication at 2:00 PM</span>
          </div>
          <div className="reminder-item">
            <span className="reminder-icon">🏥</span>
            <span>Annual check-up due in 2 weeks</span>
          </div>
          <div className="reminder-item">
            <span className="reminder-icon">💉</span>
            <span>Vaccination due next month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;