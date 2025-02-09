import axios from "axios";
import { API_URL } from "../utils/consts";
import { Login, Register } from "../utils/types";

export const register = async (register: Register) => {
  return axios.post(`${API_URL}/auth/register`, register);
};

export const login = async (login: Login) => {
  return axios.post(`${API_URL}/auth/login`, login);
};

export const refreshToken = async () => {
  const tokens = JSON.parse(localStorage?.getItem("token") || "{}");
  console.log(tokens);
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

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
