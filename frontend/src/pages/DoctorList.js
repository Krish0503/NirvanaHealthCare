import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';
import '../styles/DoctorList.css';

const API_URL = 'http://localhost:5000';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filterSpec, setFilterSpec] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/doctors`);
        setDoctors(res.data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Could not load doctors. Make sure the Flask backend is running on port 5000.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  /* ── Derive specializations for filter ── */
  const specializations = ['All', ...new Set(doctors.map((d) => d.specialization))];

  /* ── Filter + search ── */
  const filtered = doctors.filter((d) => {
    const matchSpec = filterSpec === 'All' || d.specialization === filterSpec;
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSpec && matchSearch;
  });

  /* ── Booking success callback ── */
  const handleBookingSuccess = () => {
    setSelectedDoctor(null);
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="dl-container" style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="dl-loading">
          <div className="dl-spinner" />
          <p>Loading doctors...</p>
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="dl-container" style={{ paddingTop: 'var(--navbar-height)' }}>
        <div className="dl-error">
          <span className="dl-error-icon">⚠️</span>
          <h2>Connection Error</h2>
          <p>{error}</p>
          <pre>cd backend && python app.py</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="dl-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Header */}
      <div className="dl-header">
        <h1>Our Doctors</h1>
        <p>Book an appointment with our experienced healthcare professionals</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="dl-toolbar">
        <div className="dl-search">
          <span className="dl-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, hospital, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="dl-filter">
          <label htmlFor="spec-filter">Specialization:</label>
          <select
            id="spec-filter"
            value={filterSpec}
            onChange={(e) => setFilterSpec(e.target.value)}
          >
            {specializations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="dl-count">
        Showing <strong>{filtered.length}</strong> of {doctors.length} doctors
      </p>

      {/* Doctor Cards Grid */}
      {filtered.length === 0 ? (
        <div className="dl-empty">
          <span>🩺</span>
          <p>No doctors match your search. Try a different filter.</p>
        </div>
      ) : (
        <div className="dl-grid">
          {filtered.map((doctor, idx) => (
            <div
              key={doctor.id}
              className="dl-card"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="dl-card-avatar">
                {doctor.name.split(' ').slice(-1)[0][0]}
              </div>
              <div className="dl-card-body">
                <h3 className="dl-card-name">{doctor.name}</h3>
                <span className="dl-card-spec">{doctor.specialization}</span>
                <p className="dl-card-hospital">🏥 {doctor.hospital}</p>
                <div className="dl-card-meta">
                  <span className="dl-card-exp">
                    {doctor.experience} yrs exp
                  </span>
                  <span className="dl-card-fee">
                    ₹{doctor.fee}
                  </span>
                </div>
              </div>
              <button
                className="dl-card-book"
                onClick={() => setSelectedDoctor(doctor)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingForm
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default DoctorList;
