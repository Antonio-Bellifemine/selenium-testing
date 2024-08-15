import axios from 'axios';

// Create an Axios instance with global configuration
const axiosInstance = axios.create({
  baseURL: 'https://thanhdev.pythonanywhere.com/api',  // Set your base URL
  timeout: 10000,                      // Set a timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json',  // Default Content-Type header
  },
});

// Optionally set up global request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally set up global response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
