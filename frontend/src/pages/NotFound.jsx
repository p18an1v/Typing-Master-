// NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css'; // Custom CSS for styling

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <button className="home-button" onClick={goToHome}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
