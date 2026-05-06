import { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('userInfo');
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch (error) {
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  // Login
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
     localStorage.setItem('token', userData.token); 
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);