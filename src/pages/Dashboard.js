import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const healthMetrics = {
    appointments: 3,
    prescriptions: 5,
    upcomingTests: 2,
    notifications: 4,
  };

  const recentActivities = [
    { date: "2024-03-20", activity: "Blood Test Results Received" },
    { date: "2024-03-19", activity: "Doctor Appointment - Dr. Smith" },
    { date: "2024-03-18", activity: "Prescription Renewed" },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Health Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Quick Stats */}
        <div className="dashboard-section stats-grid">
          <div className="stat-card">
            <h3>Upcoming Appointments</h3>
            <p className="stat-number">{healthMetrics.appointments}</p>
          </div>
          <div className="stat-card">
            <h3>Active Prescriptions</h3>
            <p className="stat-number">{healthMetrics.prescriptions}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Tests</h3>
            <p className="stat-number">{healthMetrics.upcomingTests}</p>
          </div>
          <div className="stat-card">
            <h3>New Notifications</h3>
            <p className="stat-number">{healthMetrics.notifications}</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dashboard-section">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-date">{activity.date}</span>
                <span className="activity-description">{activity.activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-button">Schedule Appointment</button>
            <button className="action-button">Request Prescription</button>
            <button className="action-button">View Medical Records</button>
            <button className="action-button">Contact Doctor</button>
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