import axios from "axios";
import { API_URL } from "../utils/consts";

export const getUsers = async () => {
  //return await axiosInstance.get(`/api/v1/user/all-users`);
  return await axios.get(`${API_URL}/api/v1/user/all-users`);
};

export const getMe = async (token: string) => {
  return await fetch("/api/v1/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
