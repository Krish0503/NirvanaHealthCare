import React, { useState, useRef, useEffect } from 'react';
import '../styles/VideoCall.css';

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Hello! I am Dr. Ananya Sharma. How are you feeling today?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [cameraError, setCameraError] = useState(null);

  const localVideoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  const doctor = {
    name: "Dr. Ananya Sharma",
    specialization: "Cardiologist & General Medicine",
    experience: "12 years exp",
    hospital: "Apollo Hospital",
    status: "Online",
  };

  /* ── Start Real Webcam Stream ── */
  const handleStartCall = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch (err) {
      console.error('Camera/Mic permission error:', err);
      // If camera blocked/unavailable, allow virtual consultation mode
      setCameraError('Camera/Mic access denied or unavailable. Virtual consultation active in demo mode.');
      setIsCallActive(true);
    }
  };

  /* ── End Call & stop media tracks ── */
  const handleEndCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setCallDuration(0);
  };

  /* ── Mute / Unmute Audio ── */
  const handleToggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
    setIsMuted((prev) => !prev);
  };

  /* ── Video On / Off ── */
  const handleToggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
      }
    }
    setIsVideoOff((prev) => !prev);
  };

  /* ── Call duration timer ── */
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isCallActive]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /* ── Chat handler ── */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = { id: Date.now(), sender: 'patient', text: newMessage };
    setChatMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    // Simulated doctor response after 1.5s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'doctor',
          text: 'Thank you for sharing. Please make sure to stay relaxed while I review your consultation notes.',
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="vc-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Header */}
      <div className="vc-header">
        <div>
          <h1>Virtual Consultation Room</h1>
          <p>Encrypted Video Call with Certified Specialist</p>
        </div>
        {isCallActive && (
          <div className="vc-call-timer">
            <span className="vc-live-dot">●</span> LIVE — {formatDuration(callDuration)}
          </div>
        )}
      </div>

      {cameraError && <div className="vc-warning">{cameraError}</div>}

      {/* Main Grid */}
      <div className="vc-grid">
        {/* Video Area */}
        <div className="vc-video-panel">
          <div className="vc-screen">
            {isCallActive ? (
              <div className="vc-active-wrapper">
                {/* Doctor Video Stream (Simulated Doctor Interface) */}
                <div className="vc-doctor-feed">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800"
                    alt={doctor.name}
                    className="vc-doctor-img"
                  />
                  <div className="vc-doctor-overlay">
                    <span className="vc-doc-badge">{doctor.name} ({doctor.specialization})</span>
                  </div>
                </div>

                {/* Patient WebCam Stream */}
                <div className="vc-patient-feed">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`vc-patient-video ${isVideoOff ? 'hidden' : ''}`}
                  />
                  {isVideoOff && <div className="vc-patient-off">Camera Off</div>}
                  <span className="vc-self-label">You (Patient)</span>
                </div>
              </div>
            ) : (
              <div className="vc-placeholder">
                <div className="vc-doc-card">
                  <div className="vc-doc-avatar">A</div>
                  <h2>{doctor.name}</h2>
                  <p className="vc-doc-spec">{doctor.specialization}</p>
                  <p className="vc-doc-hosp">🏥 {doctor.hospital} • {doctor.experience}</p>
                  <span className="vc-online-status">● Doctor is ready online</span>
                </div>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="vc-controls">
            {!isCallActive ? (
              <button className="vc-btn vc-btn--start" onClick={handleStartCall}>
                🎥 Join Video Consultation
              </button>
            ) : (
              <div className="vc-btn-group">
                <button
                  className={`vc-control-btn ${isMuted ? 'active' : ''}`}
                  onClick={handleToggleMute}
                  title={isMuted ? "Unmute Mic" : "Mute Mic"}
                >
                  {isMuted ? '🔇 Muted' : '🎤 Mic On'}
                </button>
                <button
                  className={`vc-control-btn ${isVideoOff ? 'active' : ''}`}
                  onClick={handleToggleVideo}
                  title={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
                >
                  {isVideoOff ? '📵 Cam Off' : '📹 Cam On'}
                </button>
                <button className="vc-btn vc-btn--end" onClick={handleEndCall}>
                  📞 End Consultation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Side Chat */}
        <div className="vc-chat-panel">
          <div className="vc-chat-header">
            <h3>Consultation Chat</h3>
            <span className="vc-chat-status">Live Text Channel</span>
          </div>

          <div className="vc-messages">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`vc-msg ${msg.sender === 'doctor' ? 'vc-msg--doctor' : 'vc-msg--patient'}`}
              >
                <span className="vc-msg-sender">
                  {msg.sender === 'doctor' ? doctor.name : 'You'}
                </span>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="vc-chat-form">
            <input
              type="text"
              placeholder="Type message to doctor..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" disabled={!newMessage.trim()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
