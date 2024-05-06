import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.weekday.technology',
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
