import axios from 'axios';

// Use environment variable for API URL (set in Docker) or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9092/assalaiskane/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;