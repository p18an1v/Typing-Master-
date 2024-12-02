import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { fetchUserData } from '../services/api'; // Function to fetch user data
import '../styles/Profile.css'; // Custom CSS for styling

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      if (user?.token) {
        try {
          const data = await fetchUserData(user.token); // Pass token explicitly
          setUserData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      }
    };

    fetchUserProfileData();
  }, [user]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!user || !userData)
    return <div className="error-message">Please log in to view your profile</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="data:image/jpeg;base64,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"
            alt="Profile"
            className="profile-pic"
          />
          <h2>{userData.username || 'No Username'}</h2>
          <p className="profile-email">{userData.email}</p>
        </div>
        <div className="profile-details">
          <h3>Details</h3>
          <p>
            <strong>Role:</strong> {userData.role.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;


