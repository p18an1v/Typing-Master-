import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar Section */}
      <nav className="navbar">
        <h1 className="navbar-brand">
          <Link to="/">Typing Master</Link>
        </h1>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </div>
      </nav>

      {/* Main Section */}
      <header className="header">
        <h1 className="header-title">Welcome to Typing Master</h1>
        <p className="header-subtitle">
          Improve your typing speed and accuracy. Track your progress and compete globally.
        </p>
        <div className="header-buttons">
          <Link to="/login" className="button button-login">Login</Link>
          <Link to="/register" className="button button-register">Register</Link>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-title">About Us</h2>
        <div className="about-content">
          <img src="data:image/jpeg;base64,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" alt="Typing Practice" className="about-image"/>
          <div className="about-text">
            <p>
              Typing Master is the ultimate platform to improve your typing skills. Whether you're a beginner
              or an advanced typist, we offer tailored exercises and progress tracking to help you improve faster.
            </p>
            <p>
              Join our community to challenge yourself and see how you stack up against others in the world. 
              Track your typing speed, accuracy, and overall progress over time!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh2pCDUG_1c3qbbIfM6WxxsOLXE9tOgMObFA&s" alt="Feature 1" />
            <h3>Personalized Practice</h3>
            <p>Tailor your typing practice based on your skill level and goals.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAT7erey8j_zcxZn0KgusU2jVepZJsljNjA&s" alt="Feature 2" />
            <h3>Progress Tracking</h3>
            <p>Track your improvement with detailed statistics and reports.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DbT4vNw1A6GaPa_qGM9Ps7Y9G5q3hb1-uA&s" alt="Feature 3" />
            <h3>Global Leaderboards</h3>
            <p>Compete with others worldwide and see how you rank!</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-list">
          <div className="testimonial-item">
            <p>"Typing Master helped me increase my typing speed by 30% in just one month. I love the challenges!"</p>
            <p>- John Doe</p>
          </div>
          <div className="testimonial-item">
            <p>"A fantastic tool for improving typing accuracy. The progress tracking is spot on!"</p>
            <p>- Jane Smith</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p className="footer-text">© 2024 Typing Master. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

