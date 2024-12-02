import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login'; // Your login page
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard'; // Your dashboard page
import NotFound from './pages/NotFound'; // Your 404 page
import ProtectedRoute from './components/PrivateRoute'; // Import ProtectedRoute
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
const App = () => {
  const { user } = useContext(AuthContext); // Accessing context

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Dashboard /> : <Login />} />
        <Route path="/dashboard" element={
            <ProtectedRoute> {/* Protected route */}
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
         <Route path="/progress" element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        } />
         <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
         <Route path="/register" element={<Registration />} />
         <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
