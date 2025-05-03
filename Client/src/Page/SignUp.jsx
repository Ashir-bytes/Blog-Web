import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    // Validate form fields
    if (!email || !password || !username) {
      setErrorMessage('All fields are required');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setSuccessMessage('Registration successful!');
        localStorage.setItem('token', data.token);  // Assuming the backend sends the token
        setEmail('');
        setPassword('');
        setusername('');
        navigate('/profile'); // Redirect to profile page
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setErrorMessage('Network error, please try again');
      console.error('Error:', err);
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
            type="text"
            value={username}
            name="username"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Uername"
          />
        </div>

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
        

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
