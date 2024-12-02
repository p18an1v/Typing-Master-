// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main app component
import AuthProvider from './contexts/AuthContext'; // Import the provider
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // or the path where your Tailwind styles are


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

