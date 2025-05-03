import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css'; // Ensure this CSS file exists or remove if not needed

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Ensure loading is true at the start
      setErrorMessage(''); // Clear previous errors

      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found, please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          const errorData = await res.json();
          setErrorMessage(errorData.message || `Server responded with status: ${res.status}`);
          setUser(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMessage('Network error occurred. Please check your connection or if the server is running.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on component mount

  // --- Render Logic ---
  if (loading) {
    return <div className="user-profile-page"><p>Loading user profile...</p></div>;
  }

  if (errorMessage) {
    return (
      <div className="user-profile-page error-container">
        <h1>Error</h1>
        <p className="error-message">{errorMessage}</p>
        <Link to="/login" className="edit-button">Go to Login</Link>
      </div>
    );
  }

  if (!user) {
    return <div className="user-profile-page"><p>No user data available.</p></div>;
  }

  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  // Successful fetch: Display user data
  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>

      <div className="user-details">
        <img src="/logo.png" alt=""  className='logo'/>
        <div className="user-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>

      <div className="user-actions">
        <Link to="/edit-profile" className="edit-button">Edit Profile</Link>
        {/* Add a logout button if needed */}
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </div>
  );
};

export default UserProfile;
