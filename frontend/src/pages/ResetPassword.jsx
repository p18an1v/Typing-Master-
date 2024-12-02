import React, { useState } from 'react';
import { forgotPassword, resetPassword } from '../services/api'; // Import API functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/ResetPassword.css'; // Optional CSS for styling

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Reset Password
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await forgotPassword(email); // Call API to send OTP
      setSuccess('OTP sent to your email address.');
      setStep(2); // Proceed to the next step
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = { email, otp, newPassword };
      await resetPassword(data); // Call API to reset password
      setSuccess('Password reset successfully. You can now log in with your new password.');
      
      // Redirect to login page after successful reset
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Wait for 2 seconds to show success message before redirecting

      setStep(1); // Reset form
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form">
        <h2>Reset Password</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {step === 1 && (
          <div>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            <button type="submit" className="btn" onClick={handleSendOTP}>Send OTP</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label>OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP sent to your email"
                required
              />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>
            <button type="submit" className="btn" onClick={handleResetPassword}>Reset Password</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;

