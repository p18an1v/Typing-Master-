import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    console.log('Loaded user from localStorage:', token, email); // Debugging log
    if (token && email) {
      setUser({ token, email });
    }
  }, []);

  const login = (email, token) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    setUser({ email, token });
  };

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
