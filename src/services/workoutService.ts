export const getUserWorkouts = async (idUser: number, token: string) => {
  return fetch(`/api/v1/workout/user-workouts/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
