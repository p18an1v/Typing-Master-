import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // For user context
import { fetchProgress } from '../services/api'; // Function to fetch progress data
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Recharts components
import '../styles/Progress.css'; // Custom CSS for styling

const Progress = () => {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (user?.token) {
        try {
          const data = await fetchProgress(user.token); // Pass token explicitly
          setProgress(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching progress:', error);
          setLoading(false);
        }
      }
    };

    fetchUserProgress();
  }, [user]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!user || !progress)
    return <div className="error-message">Please log in to view your progress</div>;

  // Prepare data for the graph
  const chartData = progress.speeds.map((speed, index) => ({
    timestamp: new Date(progress.timestamps[index]).toLocaleString(), // Format timestamps
    speed,
    accuracy: progress.accuracies[index],
  }));

  return (
    <div className="progress-container">
      <h2>Your Progress</h2>
      <div className="chart-container">
        {/* Line Graph for Speed and Accuracy */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 10, fill: '#bbb' }} />
            <YAxis tick={{ fontSize: 12, fill: '#bbb' }} />
            <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#888' }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#8884d8"
              name="Typing Speed (WPM)"
              dot={{ r: 4 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#82ca9d"
              name="Accuracy (%)"
              dot={{ r: 4 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Display Key Metrics */}
      <div className="progress-metrics">
        <div className="metric">
          <p>Total Words Typed</p>
          <h3>{progress.totalWordsTyped}</h3>
        </div>
        <div className="metric">
          <p>Total Sessions</p>
          <h3>{progress.speeds.length}</h3>
        </div>
        <div className="metric">
          <p>Best Speed</p>
          <h3>{Math.max(...progress.speeds)} WPM</h3>
        </div>
        <div className="metric">
          <p>Best Accuracy</p>
          <h3>{Math.max(...progress.accuracies)}%</h3>
        </div>
      </div>
    </div>
  );
};

export default Progress;




