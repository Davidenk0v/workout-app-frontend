import { idUser, User } from "../types/user";

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

export const deleteById = async (id: idUser) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  return await fetch(`/api/v1/user/${id.idUser}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (id: idUser, data: User) => {
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
