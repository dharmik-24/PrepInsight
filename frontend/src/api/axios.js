import axios from 'axios';

// Base URL for all API calls
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
<<<<<<< HEAD
    try {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Keep requests working even if stale/corrupt auth is stored.
      localStorage.removeItem('userInfo');
    }
=======
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
>>>>>>> 0c63af6d2723c019f365484070b62713ce1ed222
  }
  return config;
});

export default API;