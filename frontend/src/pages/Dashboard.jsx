import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { fetchLoremText, saveProgressToBackend } from '../services/api';
import { handleDeleteAccount as deleteAccountAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loremText, setLoremText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteCredentials, setDeleteCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const startTypingSession = async () => {
    try {
      const text = await fetchLoremText();
      if (text) {
        setLoremText(text);
      }
      setElapsedTime(60); // Set the countdown timer
      setTimerRunning(true);
      setUserInput('');
      setWordsTyped(0);
      setSpeed(0);
      setAccuracy(0);
      setShowResults(false);
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  const stopTypingSession = () => {
    setTimerRunning(false);
    calculateSpeedAccuracy(userInput);
    setShowResults(true);
    handleSaveProgress();
  };

  useEffect(() => {
    if (timerRunning && elapsedTime > 0) {
      const timer = setTimeout(() => setElapsedTime((time) => time - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timerRunning && elapsedTime === 0) {
      stopTypingSession();
    }
  }, [timerRunning, elapsedTime]);

  const handleTyping = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
    calculateSpeedAccuracy(inputText);
  };

  const calculateSpeedAccuracy = (inputText) => {
    const words = inputText.trim().split(/\s+/).length;
    setWordsTyped(words);

    const typingSpeed = (words / (60 - elapsedTime || 1)).toFixed(2);
    setSpeed(typingSpeed);

    const correctChars = inputText.split('').filter((char, i) => char === loremText[i]).length;
    const accuracyPercentage = ((correctChars / loremText.length) * 100).toFixed(2);
    setAccuracy(accuracyPercentage);
  };

  const handleSaveProgress = async () => {
    const progressData = { speed, accuracy, wordsTyped };
    await saveProgressToBackend(progressData);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await deleteAccountAPI(deleteCredentials, token);
      alert('Account deleted successfully.');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error.message);
      setError(error.message || 'Failed to delete account. Please check your credentials and try again.');
    }
  };

  const handleChange = (e) => {
    setDeleteCredentials({ ...deleteCredentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li onClick={() => navigate('/profile')}>Profile</li>
          <li onClick={() => navigate('/progress')}>Progress</li>
          <li onClick={() => setShowSettings(!showSettings)}>
            Settings
            {showSettings && (
              <ul className="settings-dropdown">
                <li onClick={() => setShowDeleteForm(true)}>Delete Account</li>
                <li onClick={() => navigate('/reset-password')}>Change Password</li>
              </ul>
            )}
          </li>
          <li onClick={logout}>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Typing Practice</h2>
        {!timerRunning && !showResults && (
          <button className="start-btn" onClick={startTypingSession}>
            Start Typing
          </button>
        )}

        {timerRunning && (
          <div className="typing-area">
            <h3>Time Remaining: {elapsedTime}s</h3>
            <div className="text-display">
              {loremText.split('').map((char, index) => {
                const userChar = userInput[index];
                const isCorrect = userChar === char;
                const isWrong = userChar && !isCorrect;
                return (
                  <span
                    key={index}
                    className={`text-char ${isCorrect ? 'correct' : isWrong ? 'wrong' : ''}`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
            <textarea
              className="hidden-input"
              value={userInput}
              onChange={handleTyping}
              autoFocus
            />
          </div>
        )}

        {showResults && (
          <div className="results">
            <h3>Typing Results</h3>
            <p>Speed: {speed} WPS</p>
            <p>Accuracy: {accuracy}%</p>
            <p>Words Typed: {wordsTyped}</p>
            <button onClick={startTypingSession}>Try Again</button>
          </div>
        )}
      </div>

      {showDeleteForm && (
        <div className="delete-account-modal">
          <div className="modal-content">
            <h3>Delete Account</h3>
            <p>Enter your email and password to confirm account deletion:</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleDeleteAccount}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={deleteCredentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={deleteCredentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn delete-btn">
                  Delete Account
                </button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowDeleteForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
