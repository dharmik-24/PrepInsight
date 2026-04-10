import { createContext, useContext, useState } from 'react';

// Global authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('userInfo');
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch (error) {
      // Recover from malformed local storage values instead of crashing render.
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);