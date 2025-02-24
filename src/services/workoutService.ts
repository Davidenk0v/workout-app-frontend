import { NewWorkout } from "../types/workout";

export const getUserWorkouts = async (idUser: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  return fetch(`/api/v1/workout/user-workouts/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteWorkout = async (idWorkout: number) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  return fetch(`/api/v1/workout/${idWorkout}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createWorkout = async (workout: NewWorkout) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  return fetch(`/api/v1/workout/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(workout),
  });
};
