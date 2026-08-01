import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookingForm.css';

const API_URL = 'http://localhost:5000';

const BookingForm = ({ doctor, onClose, onSuccess }) => {
  const [patientName, setPatientName] = useState('');
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM',
  ];

  /* ── Get tomorrow's date as minimum ── */
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !slotDate || !slotTime) return;

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/api/book`, {
        doctor_id: doctor.id,
        patient_name: patientName,
        slot_time: `${slotDate} ${slotTime}`,
      });
      setResult({ success: true, message: res.data.message, appointment: res.data.appointment });
    } catch (err) {
      const msg = err.response?.data?.error || 'Booking failed. Please try again.';
      setResult({ success: false, message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bf-overlay" onClick={onClose}>
      <div className="bf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bf-close" onClick={onClose}>&times;</button>

        {result?.success ? (
          /* ── Success view ── */
          <div className="bf-success">
            <div className="bf-success-icon">&#10003;</div>
            <h2>Appointment Booked!</h2>
            <div className="bf-success-details">
              <p><strong>Doctor:</strong> {doctor.name}</p>
              <p><strong>Patient:</strong> {result.appointment.patient_name}</p>
              <p><strong>Time:</strong> {result.appointment.slot_time}</p>
              <p><strong>Status:</strong> <span className="bf-status">{result.appointment.status}</span></p>
            </div>
            <button className="bf-done-btn" onClick={onSuccess}>Done</button>
          </div>
        ) : (
          /* ── Booking form ── */
          <>
            <div className="bf-header">
              <div className="bf-doc-avatar">
                {doctor.name.split(' ').slice(-1)[0][0]}
              </div>
              <div>
                <h2>{doctor.name}</h2>
                <p className="bf-doc-spec">{doctor.specialization}</p>
                <p className="bf-doc-hospital">{doctor.hospital}</p>
              </div>
            </div>

            <div className="bf-fee-bar">
              <span>Consultation Fee</span>
              <strong>&#8377;{doctor.fee}</strong>
            </div>

            <form onSubmit={handleSubmit} className="bf-form">
              <div className="bf-field">
                <label htmlFor="patient-name">Patient Name</label>
                <input
                  id="patient-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="bf-field">
                <label htmlFor="slot-date">Appointment Date</label>
                <input
                  id="slot-date"
                  type="date"
                  min={minDate}
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  required
                />
              </div>

              <div className="bf-field">
                <label>Select Time Slot</label>
                <div className="bf-slots">
                  {timeSlots.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`bf-slot${slotTime === t ? ' bf-slot--active' : ''}`}
                      onClick={() => setSlotTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {result && !result.success && (
                <div className="bf-error-msg">{result.message}</div>
              )}

              <button
                type="submit"
                className="bf-submit"
                disabled={submitting || !patientName || !slotDate || !slotTime}
              >
                {submitting ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
