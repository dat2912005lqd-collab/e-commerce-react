import axios from "axios";
import {API_CONFIG} from "../constants/api";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_CONFIG.timeout,
  headers:{
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

export default axiosClient;