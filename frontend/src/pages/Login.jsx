import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../services/api';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login({ email, password });
      const { jwtToken } = response.data;

      // Ensure that the token is correctly retrieved from the response
      console.log('Received Token:', jwtToken); // Debug line

      // Store token in localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('email', email);

      // Authenticate user in the context
      authenticate(email, jwtToken);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>

        {/* Forgot Password Link */}
        <div className="forgot-password">
          <a href="/reset-password">Forgot Password?</a>
        </div>

        {/* Sign Up Link */}
        <div className="signup-link">
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;

