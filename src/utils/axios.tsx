import axios from "axios";

export const weatherApi = axios.create({
  baseURL: "https://api.weatherapi.com/v1/",
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

export const ipApi = axios.create({
  baseURL: "https://ipapi.co/json/",
});
