import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [patientProfile, setPatientProfile] = useState({
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    contact: '+1 234-567-8900',
    email: 'john.doe@example.com',
    address: '123 Health Street, Medical City'
  });

  const [doctorDetails, setDoctorDetails] = useState({
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    experience: '15 years',
    contact: '+1 234-567-8901',
    availability: 'Mon-Fri, 9:00 AM - 5:00 PM'
  });

  const [medicalRecords, setMedicalRecords] = useState([
    {
      date: '2024-03-15',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed medication and lifestyle changes',
      doctor: 'Dr. Sarah Wilson'
    },
    {
      date: '2024-02-20',
      diagnosis: 'Common Cold',
      treatment: 'Rest and over-the-counter medication',
      doctor: 'Dr. Michael Brown'
    }
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = '';
    
    if (hour < 12) {
      greetingText = 'Good Morning';
    } else if (hour < 18) {
      greetingText = 'Good Afternoon';
    } else {
      greetingText = 'Good Evening';
    }
    
    setGreeting(`${greetingText}, ${patientProfile.name}`);
  }, [patientProfile.name]);

  return (
    <div className="patient-dashboard">
      <h1 className="greeting">{greeting}</h1>
      
      <div className="dashboard-grid">
        {/* Patient Profile Section */}
        <div className="dashboard-card">
          <h2>Patient Profile</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> {patientProfile.name}</p>
            <p><strong>Age:</strong> {patientProfile.age}</p>
            <p><strong>Gender:</strong> {patientProfile.gender}</p>
            <p><strong>Blood Group:</strong> {patientProfile.bloodGroup}</p>
            <p><strong>Contact:</strong> {patientProfile.contact}</p>
            <p><strong>Email:</strong> {patientProfile.email}</p>
            <p><strong>Address:</strong> {patientProfile.address}</p>
          </div>
        </div>

        {/* Doctor Details Section */}
        <div className="dashboard-card">
          <h2>Doctor Details</h2>
          <div className="doctor-details">
            <p><strong>Name:</strong> {doctorDetails.name}</p>
            <p><strong>Specialization:</strong> {doctorDetails.specialization}</p>
            <p><strong>Experience:</strong> {doctorDetails.experience}</p>
            <p><strong>Contact:</strong> {doctorDetails.contact}</p>
            <p><strong>Availability:</strong> {doctorDetails.availability}</p>
          </div>
        </div>

        {/* Medical Records Section */}
        <div className="dashboard-card">
          <h2>Past Medical Records</h2>
          <div className="medical-records">
            {medicalRecords.map((record, index) => (
              <div key={index} className="record-item">
                <h3>Visit Date: {record.date}</h3>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Treatment:</strong> {record.treatment}</p>
                <p><strong>Doctor:</strong> {record.doctor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 