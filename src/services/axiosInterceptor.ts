import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../utils/consts";
import * as auth from "./authService";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "localhost:5173",
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const tokens = JSON.parse(localStorage.getItem("token") || "{}");
    if (tokens && tokens.token) {
      config.headers.Authorization = `Bearer ${tokens.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { token } = await auth.refreshToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return instance(originalRequest);
      } catch (err) {
        auth.logout();
        console.error("Error refreshing token", err);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
