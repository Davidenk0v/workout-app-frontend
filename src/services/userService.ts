import { User } from "../utils/types";

export const getUsers = async (token: string) => {
  return await fetch("/api/v1/user/all-users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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

export const deleteById = async (id: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  return await fetch(`/api/v1/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (id: number, data: User) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  return await fetch(`/api/v1/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
