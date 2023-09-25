import axios from "axios";

const Instance = axios.create({
    baseURL : 'http://localhost:4000/',
    headers: { 
      "Authorization": `Bearer ${localStorage.getItem("user")}`,
      "Content-Type": "application/json",
      timeout : 1000,
    }, 
  });

  Instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("user");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  export { Instance };