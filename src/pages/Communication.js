import React, { useState } from 'react';
import '../styles/Communication.css';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('messages');

  const communicationTabs = [
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'video', label: 'Video Call', icon: '📹' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'emergency', label: 'Emergency', icon: '🚑' }
  ];

  return (
    <div className="communication-container">
      <div className="communication-header">
        <h1>Communication Center</h1>
        <p>Connect with healthcare providers and manage your appointments</p>
      </div>

      <div className="communication-tabs">
        {communicationTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="communication-content">
        {activeTab === 'messages' && (
          <div className="messages-section">
            <h2>Messages</h2>
            <div className="message-list">
              <div className="message-item">
                <div className="message-avatar">👨‍⚕️</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="sender">Dr. Smith</span>
                    <span className="time">2:30 PM</span>
                  </div>
                  <p>Your test results are ready. Please review them in your patient portal.</p>
                </div>
              </div>
              <div className="message-item">
                <div className="message-avatar">🏥</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="sender">Hospital Admin</span>
                    <span className="time">1:45 PM</span>
                  </div>
                  <p>Your appointment has been confirmed for tomorrow at 10:00 AM.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="video-section">
            <h2>Video Consultation</h2>
            <div className="video-options">
              <button className="video-button">
                <span className="video-icon">📹</span>
                Start New Call
              </button>
              <button className="video-button">
                <span className="video-icon">📋</span>
                Scheduled Calls
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <h2>Appointment Requests</h2>
            <div className="appointment-form">
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <select>
                  <option>Morning (9:00 AM - 12:00 PM)</option>
                  <option>Afternoon (1:00 PM - 5:00 PM)</option>
                  <option>Evening (6:00 PM - 8:00 PM)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reason for Visit</label>
                <textarea placeholder="Please describe your symptoms or reason for visit"></textarea>
              </div>
              <button className="submit-button">Request Appointment</button>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="emergency-section">
            <h2>Emergency Contact</h2>
            <div className="emergency-options">
              <button className="emergency-button urgent">
                <span className="emergency-icon">🚑</span>
                Call Emergency Services
              </button>
              <button className="emergency-button">
                <span className="emergency-icon">📞</span>
                Contact On-Call Doctor
              </button>
            </div>
            <div className="emergency-info">
              <h3>Emergency Numbers</h3>
              <p>Emergency Services: 911</p>
              <p>Hospital Emergency: (555) 123-4567</p>
              <p>On-Call Doctor: (555) 987-6543</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Communication; 