import React, { useState } from 'react';
import { resetPassword } from '../services/api';
import '../styles/Settings.css';

const Settings = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(null);

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword({ email: resetEmail });
      setResetSuccess(response.message);
    } catch (error) {
      setResetSuccess(error.message || 'Error resetting password');
    }
  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality here
    alert('Account deleted (placeholder)');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="reset-password">
        <h3>Reset Password</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        {resetSuccess && <p>{resetSuccess}</p>}
      </div>
      <div className="delete-account">
        <h3>Delete Account</h3>
        <button onClick={handleDeleteAccount} className="delete-btn">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
