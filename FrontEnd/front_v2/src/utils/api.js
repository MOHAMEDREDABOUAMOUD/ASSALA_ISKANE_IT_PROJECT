import axios from 'axios';

// Crée une instance Axios avec une URL de base
const api = axios.create({
  baseURL: 'http://localhost:9092/assalaiskane/', // Remplace par l'URL de ton serveur Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
