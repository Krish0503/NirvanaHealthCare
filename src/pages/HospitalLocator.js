import React, { useState, useEffect } from 'react';
import '../styles/HospitalLocator.css';

const HospitalLocator = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    emergency: false,
    covid: false,
    specialties: []
  });

  // Mock data for hospitals (in a real app, this would come from an API)
  const mockHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Healthcare Ave, City Center",
      distance: "2.5 km",
      rating: 4.5,
      specialties: ["Emergency Care", "Cardiology", "Pediatrics"],
      emergency: true,
      covid: true,
      phone: "(555) 123-4567",
      website: "www.citygeneral.com",
      availability: "24/7",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Medical Center",
      address: "456 Health Street, Downtown",
      distance: "3.8 km",
      rating: 4.2,
      specialties: ["Orthopedics", "Neurology", "Oncology"],
      emergency: true,
      covid: false,
      phone: "(555) 987-6543",
      website: "www.medicalcenter.com",
      availability: "24/7",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Community Hospital",
      address: "789 Care Lane, Suburb",
      distance: "5.2 km",
      rating: 4.0,
      specialties: ["Family Medicine", "Dental", "Mental Health"],
      emergency: false,
      covid: true,
      phone: "(555) 456-7890",
      website: "www.communityhospital.com",
      availability: "8 AM - 8 PM",
      image: "https://via.placeholder.com/150"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setHospitals(mockHospitals);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // In a real app, this would filter hospitals based on the search query
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSpecialtyChange = (specialty) => {
    setFilters(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const getDirections = (hospital) => {
    // In a real app, this would open Google Maps with directions
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}`);
  };

  return (
    <div className="hospital-locator-container">
      <div className="search-section">
        <h1>Find Hospitals Near You</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search hospitals by name or location..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="filters-section">
        <h2>Filters</h2>
        <div className="filter-options">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.emergency}
              onChange={(e) => handleFilterChange('emergency', e.target.checked)}
            />
            Emergency Services
          </label>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.covid}
              onChange={(e) => handleFilterChange('covid', e.target.checked)}
            />
            COVID-19 Testing
          </label>
          <div className="specialties-filter">
            <h3>Specialties</h3>
            <div className="specialties-grid">
              {["Emergency Care", "Cardiology", "Pediatrics", "Orthopedics", "Neurology", "Oncology", "Family Medicine", "Dental", "Mental Health"].map(specialty => (
                <label key={specialty} className="specialty-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.specialties.includes(specialty)}
                    onChange={() => handleSpecialtyChange(specialty)}
                  />
                  {specialty}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hospitals-list">
        {loading ? (
          <div className="loading">Loading hospitals...</div>
        ) : (
          hospitals.map(hospital => (
            <div key={hospital.id} className="hospital-card">
              <div className="hospital-image">
                <img src={hospital.image} alt={hospital.name} />
              </div>
              <div className="hospital-info">
                <h3>{hospital.name}</h3>
                <p className="address">{hospital.address}</p>
                <p className="distance">{hospital.distance} away</p>
                <div className="rating">
                  {'★'.repeat(Math.floor(hospital.rating))}
                  {'☆'.repeat(5 - Math.floor(hospital.rating))}
                  <span>({hospital.rating})</span>
                </div>
                <div className="specialties">
                  {hospital.specialties.map(specialty => (
                    <span key={specialty} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
                <div className="hospital-actions">
                  <button onClick={() => setSelectedHospital(hospital)}>View Details</button>
                  <button onClick={() => getDirections(hospital)}>Get Directions</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedHospital && (
        <div className="hospital-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedHospital(null)}>×</button>
            <h2>{selectedHospital.name}</h2>
            <img src={selectedHospital.image} alt={selectedHospital.name} className="modal-image" />
            <div className="modal-details">
              <p><strong>Address:</strong> {selectedHospital.address}</p>
              <p><strong>Phone:</strong> {selectedHospital.phone}</p>
              <p><strong>Website:</strong> <a href={`https://${selectedHospital.website}`} target="_blank" rel="noopener noreferrer">{selectedHospital.website}</a></p>
              <p><strong>Availability:</strong> {selectedHospital.availability}</p>
              <p><strong>Specialties:</strong></p>
              <ul>
                {selectedHospital.specialties.map(specialty => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
              <div className="modal-actions">
                <button onClick={() => getDirections(selectedHospital)}>Get Directions</button>
                <button onClick={() => window.location.href = `tel:${selectedHospital.phone}`}>Call Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalLocator;
