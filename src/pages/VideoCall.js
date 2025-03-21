import React, { useState, useRef, useEffect } from 'react';
import '../styles/VideoCall.css';

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callQuality, setCallQuality] = useState('excellent');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const videoRef = useRef(null);
  const chatRef = useRef(null);
  const timerRef = useRef(null);

  // Sample doctor data
  const doctor = {
    name: "Dr. Sarah Smith",
    specialization: "Cardiologist",
    rating: 4.8,
    experience: "15 years",
    image: "https://example.com/doctor-image.jpg",
    status: "Online",
    nextAvailable: "2:00 PM"
  };

  // Sample chat messages
  useEffect(() => {
    setChatMessages([
      { id: 1, sender: 'doctor', text: 'Hello! How can I help you today?' },
      { id: 2, sender: 'patient', text: 'I have been experiencing chest pain.' },
      { id: 3, sender: 'doctor', text: 'I understand. Could you describe the pain in detail?' }
    ]);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isCallActive]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    // Here you would implement actual video call initialization
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsScreenSharing(false);
    // Here you would implement actual call termination
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // Here you would implement actual mute functionality
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // Here you would implement actual video toggle functionality
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Here you would implement actual screen sharing functionality
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: chatMessages.length + 1, sender: 'patient', text: newMessage }
      ]);
      setNewMessage('');
      // Scroll to bottom of chat
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  return (
    <div className="video-call-container">
      <div className="video-call-header">
        <div className="header-content">
          <h1>Video Consultation</h1>
          {isCallActive && (
            <div className="call-info">
              <span className="call-duration">{formatDuration(callDuration)}</span>
              <span className={`call-quality ${callQuality}`}>
                {callQuality.charAt(0).toUpperCase() + callQuality.slice(1)} Quality
              </span>
            </div>
          )}
        </div>
        <div className="doctor-info">
          <div className="doctor-profile">
            <div className="doctor-image-container">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <span className={`status-indicator ${doctor.status.toLowerCase()}`}></span>
            </div>
            <div className="doctor-details">
              <h2>{doctor.name}</h2>
              <p>{doctor.specialization}</p>
              <div className="doctor-rating">
                <span>⭐ {doctor.rating}</span>
                <span>{doctor.experience} experience</span>
              </div>
              <div className="doctor-status">
                <span className="status">{doctor.status}</span>
                <span className="next-available">Next available: {doctor.nextAvailable}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="video-call-main">
        {/* Video Call Section */}
        <div className="video-section">
          <div className="video-container">
            {isCallActive ? (
              <div className="video-wrapper">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={isMuted}
                  className={`video-stream ${isVideoOff ? 'video-off' : ''}`}
                />
                {isScreenSharing && (
                  <div className="screen-share-overlay">
                    <span>Screen Sharing Active</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">👨‍⚕️</span>
                  <p>Ready to start your consultation?</p>
                  <div className="call-requirements">
                    <div className="requirement-item">
                      <span className="requirement-icon">🎥</span>
                      <span>Camera Ready</span>
                    </div>
                    <div className="requirement-item">
                      <span className="requirement-icon">🎤</span>
                      <span>Microphone Ready</span>
                    </div>
                    <div className="requirement-item">
                      <span className="requirement-icon">📡</span>
                      <span>Internet Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call Controls */}
          <div className="call-controls">
            {!isCallActive ? (
              <button className="start-call-btn" onClick={handleStartCall}>
                Start Call
              </button>
            ) : (
              <>
                <button
                  className={`control-btn ${isMuted ? 'active' : ''}`}
                  onClick={handleToggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? '🔇' : '🎤'}
                </button>
                <button
                  className={`control-btn ${isVideoOff ? 'active' : ''}`}
                  onClick={handleToggleVideo}
                  title={isVideoOff ? "Enable Video" : "Disable Video"}
                >
                  {isVideoOff ? '📵' : '📹'}
                </button>
                <button
                  className={`control-btn ${isScreenSharing ? 'active' : ''}`}
                  onClick={handleToggleScreenShare}
                  title={isScreenSharing ? "Stop Sharing" : "Share Screen"}
                >
                  {isScreenSharing ? '🖥️' : '💻'}
                </button>
                <button
                  className="control-btn settings-btn"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  title="Settings"
                >
                  ⚙️
                </button>
                <button className="end-call-btn" onClick={handleEndCall}>
                  End Call
                </button>
              </>
            )}
          </div>

          {/* Settings Panel */}
          {isSettingsOpen && (
            <div className="settings-panel">
              <h3>Call Settings</h3>
              <div className="settings-options">
                <div className="setting-item">
                  <label>Camera</label>
                  <select>
                    <option>Default Camera</option>
                    <option>External Camera</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Microphone</label>
                  <select>
                    <option>Default Microphone</option>
                    <option>External Microphone</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Speaker</label>
                  <select>
                    <option>Default Speaker</option>
                    <option>External Speaker</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className={`chat-section ${isChatOpen ? 'open' : ''}`}>
          <div className="chat-header" onClick={() => setIsChatOpen(!isChatOpen)}>
            <h3>Chat with Doctor</h3>
            <div className="chat-header-controls">
              <span className="chat-toggle">{isChatOpen ? '▼' : '▲'}</span>
              <span className="unread-messages">2 new messages</span>
            </div>
          </div>
          
          <div className="chat-messages" ref={chatRef}>
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'doctor' ? 'doctor' : 'patient'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="send-message-btn">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Contact Information */}
      <div className="contact-info">
        <h3>Contact Information</h3>
        <div className="contact-details">
          <p><strong>Emergency Contact:</strong> +1 (555) 123-4567</p>
          <p><strong>Email:</strong> dr.smith@nirvanahealthcare.com</p>
          <p><strong>Available Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM</p>
          <div className="emergency-actions">
            <button className="emergency-btn">
              <span className="emergency-icon">🚨</span>
              Emergency Help
            </button>
            <button className="schedule-btn">
              <span className="schedule-icon">📅</span>
              Schedule Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
