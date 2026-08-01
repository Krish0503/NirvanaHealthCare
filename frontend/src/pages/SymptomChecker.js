import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SymptomChecker.css';

const API_URL = 'https://nirvana-backend-z68n.onrender.com';

const SYMPTOM_CATEGORIES = [
  {
    name: 'General & Vitals',
    icon: '🌡️',
    symptoms: [
      { id: 'fever', label: 'Fever' },
      { id: 'fatigue', label: 'Fatigue / Weakness' },
      { id: 'chills', label: 'Chills / Shivering' },
      { id: 'body_ache', label: 'Body Ache' },
      { id: 'sweating', label: 'Excessive Sweating' },
    ],
  },
  {
    name: 'Respiratory',
    icon: '🫁',
    symptoms: [
      { id: 'cough', label: 'Dry or Wet Cough' },
      { id: 'shortness_of_breath', label: 'Shortness of Breath' },
      { id: 'sore_throat', label: 'Sore Throat' },
      { id: 'runny_nose', label: 'Runny / Stuffy Nose' },
      { id: 'chest_tightness', label: 'Chest Pain or Tightness' },
    ],
  },
  {
    name: 'Digestive',
    icon: '🤢',
    symptoms: [
      { id: 'nausea', label: 'Nausea' },
      { id: 'vomiting', label: 'Vomiting' },
      { id: 'diarrhea', label: 'Diarrhea' },
      { id: 'abdominal_pain', label: 'Abdominal Pain' },
      { id: 'loss_of_appetite', label: 'Loss of Appetite' },
    ],
  },
  {
    name: 'Head & Neurological',
    icon: '🧠',
    symptoms: [
      { id: 'headache', label: 'Headache' },
      { id: 'dizziness', label: 'Dizziness / Lightheadedness' },
      { id: 'confusion', label: 'Confusion / Memory Fog' },
      { id: 'sensitivity_to_light', label: 'Sensitivity to Light' },
    ],
  },
  {
    name: 'Muscles & Joints',
    icon: '🦴',
    symptoms: [
      { id: 'joint_pain', label: 'Joint Pain' },
      { id: 'skin_rash', label: 'Skin Rash' },
      { id: 'muscle_weakness', label: 'Muscle Weakness' },
    ],
  },
];

/* ──────────────────────────────────────────────
   Fallback Rule-Based Evaluation Engine
   ────────────────────────────────────────────── */
const fallbackEvaluate = (selectedIds) => {
  const has = (id) => selectedIds.includes(id);
  if (has('shortness_of_breath') && (has('fever') || has('cough'))) {
    return {
      condition: 'Severe Respiratory Infection',
      riskLevel: 'High',
      riskColor: 'danger',
      confidence: '85%',
      description: 'Shortness of breath accompanied by fever or cough suggests lower respiratory involvement.',
      advice: [
        'Seek urgent medical evaluation or visit an emergency care facility.',
        'Monitor pulse oximeter readings (SpO2 levels).',
        'Avoid strenuous physical exertion and rest in an elevated position.'
      ],
      recommendedDoctor: 'Pulmonologist / General Medicine',
      source: 'Rule-Based Engine'
    };
  }
  return {
    condition: 'General Symptomatic Malaise',
    riskLevel: 'Low',
    riskColor: 'success',
    confidence: '70%',
    description: 'Symptom pattern processed via fallback diagnostic rules.',
    advice: [
      'Maintain adequate hydration and rest.',
      'Monitor your symptoms for the next 24-48 hours.',
      'Consult a physician if symptoms worsen.'
    ],
    recommendedDoctor: 'General Practitioner',
    source: 'Rule-Based Engine'
  };
};

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleSymptom = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);

    try {
      // Call Flask scikit-learn ML endpoint
      const response = await axios.post(`${API_URL}/api/predict`, {
        symptoms: selectedSymptoms,
      });

      const data = response.data;
      setResult({
        condition: data.prediction,
        riskLevel: data.riskLevel,
        riskColor: data.riskColor,
        confidence: data.confidence,
        description: data.description,
        advice: data.advice,
        recommendedDoctor: data.recommendedDoctor,
        source: data.modelType || 'scikit-learn ML Model',
      });
    } catch (err) {
      console.warn('ML Predict endpoint unreachable — using fallback rule-based evaluation:', err);
      const fallback = fallbackEvaluate(selectedSymptoms);
      setResult(fallback);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setResult(null);
  };

  return (
    <div className="sc-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      {/* Header */}
      <div className="sc-header">
        <span className="sc-badge">🤖 Powered by scikit-learn ML Model</span>
        <h1>AI Symptom Assessment</h1>
        <p>Select your symptoms below to get an instant ML-powered diagnostic assessment.</p>
      </div>

      {/* Main Layout */}
      <div className="sc-grid">
        {/* Left Column: Checklist */}
        <div className="sc-checklist-panel">
          <div className="sc-panel-header">
            <h2>Select Symptoms</h2>
            <span className="sc-selected-count">
              {selectedSymptoms.length} selected
            </span>
          </div>

          <div className="sc-categories">
            {SYMPTOM_CATEGORIES.map((cat) => (
              <div key={cat.name} className="sc-category-block">
                <h3 className="sc-cat-title">
                  <span>{cat.icon}</span> {cat.name}
                </h3>
                <div className="sc-symptom-chips">
                  {cat.symptoms.map((sym) => {
                    const isChecked = selectedSymptoms.includes(sym.id);
                    return (
                      <button
                        type="button"
                        key={sym.id}
                        className={`sc-chip ${isChecked ? 'sc-chip--selected' : ''}`}
                        onClick={() => toggleSymptom(sym.id)}
                      >
                        <span className="sc-chip-icon">
                          {isChecked ? '✓' : '+'}
                        </span>
                        {sym.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="sc-actions">
            <button
              className="sc-btn sc-btn--primary"
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? 'Analyzing with ML Model...' : 'Predict Health Condition'}
            </button>
            {selectedSymptoms.length > 0 && (
              <button className="sc-btn sc-btn--ghost" onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Assessment Result */}
        <div className="sc-result-panel">
          {!result ? (
            <div className="sc-empty-result">
              <span className="sc-empty-icon">🩺</span>
              <h3>No Symptoms Analyzed Yet</h3>
              <p>Select symptoms from the checklist on the left and click <strong>Predict Health Condition</strong> to view machine learning predictions.</p>
            </div>
          ) : (
            <div className="sc-result-card fade-in">
              <div className="sc-result-header">
                <span className={`sc-risk-tag ${result.riskColor}`}>
                  {result.riskLevel} Risk
                </span>
                <span className="sc-confidence">
                  ML Confidence: {result.confidence}
                </span>
              </div>

              <h2 className="sc-condition-title">{result.condition}</h2>
              <p className="sc-condition-desc">{result.description}</p>

              <div className="sc-section">
                <h4>Recommended Actions</h4>
                <ul className="sc-advice-list">
                  {result.advice.map((item, idx) => (
                    <li key={idx}>
                      <span className="sc-bullet">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sc-doctor-box">
                <span className="sc-doc-icon">👨‍⚕️</span>
                <div>
                  <strong>Recommended Specialist:</strong>
                  <p>{result.recommendedDoctor}</p>
                </div>
              </div>

              <div className="sc-disclaimer-box">
                <p>
                  🤖 <strong>Engine:</strong> {result.source}<br/>
                  ⚠️ <strong>Disclaimer:</strong> This ML prediction model is trained for educational purposes and provides informational guidance. Consult certified medical professionals for clinical diagnosis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
