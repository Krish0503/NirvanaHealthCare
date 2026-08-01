import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = 'https://nirvana-backend-z68n.onrender.com';

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isRegister ? `${API_URL}/api/auth/register` : `${API_URL}/api/auth/login`;
    const payload = isRegister ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(endpoint, payload);
      const user = response.data.user;

      // Store authenticated user session
      localStorage.setItem('nirvana_user', JSON.stringify(user));

      // Dispatch custom storage event for navbar auto-update
      window.dispatchEvent(new Event('nirvana_auth_changed'));

      navigate('/patient-records');
    } catch (err) {
      console.error('Auth error:', err);
      const msg = err.response?.data?.error || 'Authentication failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ paddingTop: 'var(--navbar-height)' }}>
      <div className="login-box">
        <div className="login-header">
          <h2>{isRegister ? 'Patient Registration' : 'Patient Login'}</h2>
          <p>{isRegister ? 'Create an account to track your records' : 'Access your medical records and appointments'}</p>
        </div>

        {error && <div className="login-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-body">
          {isRegister && (
            <div className="login-field">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="login-field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="auth-pass">Password</label>
            <input
              id="auth-pass"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button className="auth-toggle-link" onClick={() => setIsRegister(false)}>
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button className="auth-toggle-link" onClick={() => setIsRegister(true)}>
                Register Now
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;