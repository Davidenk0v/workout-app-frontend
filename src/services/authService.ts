import axios from "axios";
import { API_URL } from "../utils/consts";
import { Login, Register } from "../types/user";

export const register = async (register: Register) => {
  return axios.post(`${API_URL}/auth/register`, register);
};

export const login = async (login: Login) => {
  return axios.post(`${API_URL}/auth/login`, login);
};

export const refreshToken = async () => {
  const tokens = JSON.parse(localStorage?.getItem("token") || "{}");
  return axios
    .post(`${API_URL}/auth/refresh`, {
      refreshToken: tokens.refreshToken,
    })
    .then((response) => {
      if (response.data.token) {
        tokens.token = response.data.token;
        localStorage.setItem("token", JSON.stringify(tokens));
      }
      return response.data;
    });
};

export const refresh = async () => {
  const tokens = JSON.parse(localStorage.getItem("token") || "{}");
  const response = fetch(`/auth/refresh`, {
    method: "POST",
    body: JSON.stringify(tokens.refreshToken),
  });
  const data = (await response).json();
  console.log(data);
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
