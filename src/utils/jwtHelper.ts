import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/authService";
import { DecodedToken } from "../types/auth";

export const refreshTokenIfExpired = async (token: string): Promise<void> => {
  if (token && !isValidToken(token)) {
    await refreshToken();
  }
};

export const isValidToken = (token: string): boolean => {
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUserId = (): number => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  if (!token) return -1;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const isAdmin = (): boolean => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.authorities.includes("ROLE_ADMIN");
  } catch (error) {
    console.error(error);
    return false;
  }
};
