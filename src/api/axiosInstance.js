import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
});


console.log("Backend base URL:", import.meta.env.VITE_BASE_URL);

export default axiosInstance;