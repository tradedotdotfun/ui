import axios from 'axios';

const API_BASE_URL = "http://3.39.177.101:8080/"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
