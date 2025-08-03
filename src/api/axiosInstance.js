import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  
});

console.log("Backend base URL:", process.env.REACT_APP_BASE_URL);

console.log("Todas las variables:", process.env);


export default axiosInstance;