import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem('token');
      
            const res = await fetch('http://localhost:3000/api/users/me', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
      
            const data = await res.json();
      
            if (res.ok) {
              setUser(data);
              setLoading(false);
            } else {
              setErrorMessage(data.message || 'Failed to fetch user');
              setLoading(false);
            }
          // eslint-disable-next-line no-unused-vars
          } catch (err) {
            setErrorMessage('Network error');
            setLoading(false);
          }
        };
      
        fetchUserProfile();
      }, []);
      
    if (loading) return <div>Loading...</div>;
    if (errorMessage) return <div className="error">{errorMessage}</div>;

    return (
        <div className="user-profile-page">
            <h1>User Profile</h1>

            <div className="user-details">
                <img
                    src={user.profilePicture || 'default-profile-pic.jpg'}
                    alt={user.username}
                    className="profile-picture"
                />
                <div className="user-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="user-actions">
                <Link to="/edit-profile" className="edit-button">Edit Profile</Link>
            </div>
        </div>
    );
};

export default UserProfile;
