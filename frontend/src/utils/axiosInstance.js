import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", 
});

const axiosInstance = axios.create({
  baseURL: "https://excel-ffjy.onrender.com", // your backend Render URL
  withCredentials: true, // if you use cookies
});

export default axiosInstance;

export default API;
