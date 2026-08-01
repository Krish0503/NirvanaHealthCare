import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/HospitalLocator.css';

/* ── Fix Leaflet default marker icons (webpack breaks them) ── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ──────────────────────────────────────────────
   Haversine — straight-line distance (km)
   ────────────────────────────────────────────── */
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/* ──────────────────────────────────────────────
   Star-rating helper
   ────────────────────────────────────────────── */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {half && '⯨'}
      {'☆'.repeat(empty)}
    </span>
  );
};

/* ──────────────────────────────────────────────
   Custom marker icons
   ────────────────────────────────────────────── */
const userIcon = L.divIcon({
  className: 'hl-user-marker',
  html: '<div class="hl-user-dot"><div class="hl-user-pulse"></div></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const hospitalIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/* ──────────────────────────────────────────────
   Overpass API — find nearby hospitals (FREE)
   ────────────────────────────────────────────── */
const fetchHospitals = async (lat, lng, radiusMetres) => {
  const query = `
    [out:json][timeout:15];
    (
      node["amenity"="hospital"](around:${radiusMetres},${lat},${lng});
      way["amenity"="hospital"](around:${radiusMetres},${lat},${lng});
      node["amenity"="clinic"](around:${radiusMetres},${lat},${lng});
      way["amenity"="clinic"](around:${radiusMetres},${lat},${lng});
    );
    out center body;
  `;
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  const data = await res.json();
  return data.elements.map((el) => {
    const elLat = el.lat || el.center?.lat;
    const elLng = el.lon || el.center?.lon;
    return {
      id: el.id,
      name: el.tags?.name || 'Hospital / Clinic',
      address: el.tags?.['addr:full'] || el.tags?.['addr:street'] || 'Address not listed',
      phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
      website: el.tags?.website || el.tags?.['contact:website'] || null,
      emergency: el.tags?.emergency === 'yes',
      type: el.tags?.amenity === 'clinic' ? 'Clinic' : 'Hospital',
      lat: elLat,
      lng: elLng,
      distance: haversine(lat, lng, elLat, elLng),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Overpass has no ratings — simulated
    };
  }).sort((a, b) => a.distance - b.distance);
};

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
const HospitalLocator = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersLayerRef = useRef(null);

  const [userPos, setUserPos] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [radius, setRadius] = useState(5000);

  /* ── Get user geolocation ─────────────────── */
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setUserPos({ lat: 28.6139, lng: 77.209 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {
        setUserPos({ lat: 28.6139, lng: 77.209 });
        setError('Location access denied — showing default area (New Delhi).');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  /* ── Initialise Leaflet map ────────────────── */
  useEffect(() => {
    if (!userPos || !mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [userPos.lat, userPos.lng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // User marker
    L.marker([userPos.lat, userPos.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup('<strong>📍 You are here</strong>');

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstance.current = map;

    // Fix map rendering in hidden/dynamic containers
    setTimeout(() => map.invalidateSize(), 200);
  }, [userPos]);

  /* ── Fetch hospitals on position/radius change ── */
  const loadHospitals = useCallback(async () => {
    if (!userPos) return;
    setLoading(true);
    setError(null);
    try {
      const results = await fetchHospitals(userPos.lat, userPos.lng, radius);
      setHospitals(results);

      // Update markers
      if (markersLayerRef.current) {
        markersLayerRef.current.clearLayers();
        results.forEach((h) => {
          const marker = L.marker([h.lat, h.lng], { icon: hospitalIcon })
            .bindPopup(
              `<div style="font-family:Inter,sans-serif;min-width:180px;">
                <strong>${h.name}</strong><br/>
                <span style="color:#64748b;font-size:13px;">${h.address}</span><br/>
                <span style="color:#6C63FF;font-size:13px;font-weight:500;">${h.distance.toFixed(1)} km away</span>
                ${h.phone ? `<br/><span style="font-size:13px;">📞 ${h.phone}</span>` : ''}
              </div>`
            );
          marker.on('click', () => setSelectedId(h.id));
          markersLayerRef.current.addLayer(marker);
        });
      }

      // Fit bounds
      if (mapInstance.current && results.length > 0) {
        const group = L.featureGroup(
          results.map((h) => L.marker([h.lat, h.lng]))
        );
        mapInstance.current.fitBounds(group.getBounds().pad(0.1));
      }
    } catch (err) {
      console.error('Overpass API error:', err);
      setError('Could not fetch nearby hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userPos, radius]);

  useEffect(() => {
    loadHospitals();
  }, [loadHospitals]);

  /* ── Click hospital in list ────────────────── */
  const focusHospital = (hospital) => {
    setSelectedId(hospital.id);
    if (mapInstance.current) {
      mapInstance.current.setView([hospital.lat, hospital.lng], 16, { animate: true });
      // Open the marker popup
      markersLayerRef.current.eachLayer((layer) => {
        if (layer.getLatLng &&
            Math.abs(layer.getLatLng().lat - hospital.lat) < 0.0001 &&
            Math.abs(layer.getLatLng().lng - hospital.lng) < 0.0001) {
          layer.openPopup();
        }
      });
    }
  };

  /* ── Directions link ───────────────────────── */
  const getDirections = (hospital) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`,
      '_blank'
    );
  };

  /* ── Render ────────────────────────────────── */
  return (
    <div className="hospital-locator-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Header */}
      <div className="hl-header">
        <h1>Find Hospitals Near You</h1>
        <p>Discover nearby hospitals and clinics using OpenStreetMap — completely free, no API key needed.</p>
        <div className="hl-controls">
          <label htmlFor="radius-select">Search Radius:</label>
          <select
            id="radius-select"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          >
            <option value={2000}>2 km</option>
            <option value={5000}>5 km</option>
            <option value={10000}>10 km</option>
            <option value={20000}>20 km</option>
          </select>
        </div>
      </div>

      {error && <div className="hl-error">{error}</div>}

      {/* Split panel */}
      <div className="hl-split">
        {/* Map */}
        <div className="hl-map-wrapper">
          <div ref={mapRef} className="hl-map" />
        </div>

        {/* List */}
        <div className="hl-list-wrapper">
          <h2 className="hl-list-title">
            Nearby Hospitals
            {!loading && <span className="hl-count">{hospitals.length} found</span>}
          </h2>

          {loading ? (
            <div className="hl-loading">
              <div className="hl-spinner" />
              <p>Searching nearby hospitals…</p>
            </div>
          ) : hospitals.length === 0 ? (
            <div className="hl-empty">
              <span>🏥</span>
              <p>No hospitals found in this area. Try increasing the radius.</p>
            </div>
          ) : (
            <ul className="hl-list">
              {hospitals.map((h) => (
                <li
                  key={h.id}
                  className={`hl-card${selectedId === h.id ? ' hl-card--active' : ''}`}
                  onClick={() => focusHospital(h)}
                >
                  <div className="hl-card-top">
                    <h3>{h.name}</h3>
                    <span className={`hl-type ${h.type.toLowerCase()}`}>{h.type}</span>
                  </div>
                  <p className="hl-address">{h.address}</p>
                  <div className="hl-meta">
                    <span className="hl-rating">
                      {renderStars(parseFloat(h.rating))} {h.rating}
                    </span>
                    <span className="hl-distance">{h.distance.toFixed(1)} km</span>
                  </div>
                  {(h.phone || h.emergency) && (
                    <div className="hl-extras">
                      {h.emergency && <span className="hl-emergency-tag">🚑 Emergency</span>}
                      {h.phone && <span className="hl-phone">📞 {h.phone}</span>}
                    </div>
                  )}
                  <div className="hl-actions">
                    <button
                      className="hl-btn hl-btn--primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(h);
                      }}
                    >
                      Get Directions
                    </button>
                    <button
                      className="hl-btn hl-btn--secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        focusHospital(h);
                      }}
                    >
                      View on Map
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalLocator;
