import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true); // Set loading state to true when the form is submitted

    // Basic form validation
    if (!email || !password) {
      setErrorMessage('Both email and password are required');
      setLoading(false);
      return;
    }

    // Email format validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status === 401) {
        setErrorMessage(data.message || 'Invalid credentials');
      } else if (res.ok) {
        localStorage.setItem('token', data.user.token); // <-- save token
        setSuccessMessage('Login successful!');
        setEmail(''); // Reset form fields
        setPassword('');
        navigate('/profile'); // Redirect to profile page
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Network error, please try again');
    } finally {
      setLoading(false); // Set loading to false when the request is done
    }
  };

  return (
    <div className="login-container">
      <form
        className={`login-box ${errorMessage ? 'shake' : ''}`}
        onSubmit={handleSubmit}
      >
        <h2>Sign In</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="field">
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="field password-field">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <span
            className="toggle-pass"
            onClick={() => setShowPass((v) => !v)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
