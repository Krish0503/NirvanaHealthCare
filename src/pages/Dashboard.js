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

  const recentActivities = [
    { date: '2024-03-20', activity: 'Blood Test Results Received' },
    { date: '2024-03-19', activity: 'Doctor Appointment - Dr. Smith' },
    { date: '2024-03-18', activity: 'Prescription Renewed' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Health Dashboard</h1>
        <p>Track your health metrics and appointments in one place</p>
      </div>

      <div className="dashboard-grid">
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
    </div>
  );
};

export default Dashboard;