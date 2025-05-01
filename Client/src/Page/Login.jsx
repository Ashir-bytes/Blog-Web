import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Both email and password are required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch {
      setErrorMessage('Network error, please try again');
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
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="field password-field">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <span
            className="toggle-pass"
            onClick={() => setShowPass(v => !v)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
