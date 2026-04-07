import axios from 'axios';

// Base URL for all API calls
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;