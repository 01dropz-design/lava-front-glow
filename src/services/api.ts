import axios from 'axios';

// Create axios instance with base URL
// Update this URL to match your LavaLust backend
const api = axios.create({
  baseURL: 'http://localhost:8000', // Change this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session/cookie handling
});

export default api;
