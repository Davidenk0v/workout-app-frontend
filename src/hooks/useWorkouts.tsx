import { useCallback, useState } from "react";
import { NewWorkout, Workout } from "../types/workout";
import {
  createWorkout,
  deleteWorkout,
  getUserWorkouts,
} from "../services/workoutService";
import { getUserId } from "../utils/jwtHelper";

// Hook para obtener los entrenamientos del usuario
// Abstraigo la lógica de los entrenamientos en este hook
// Devuelve los entrenamientos, la función para obtenerlos,
// la función para crear un nuevo entrenamiento y la función para borrar un entrenamiento
export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const getWorkouts = useCallback(async () => {
    try {
      const idUser = getUserId();
      const response = await getUserWorkouts(idUser);
      if (response.ok) {
        const workoutsData = await response.json();
        setWorkouts(workoutsData);
      } else {
        console.error("Error fetching workouts: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching workouts: ", error);
    }
  }, []);

  const newWorkout = useCallback(
    async (workout: NewWorkout) => {
      try {
        const response = await createWorkout(workout);
        if (response.ok) {
          getWorkouts();
        } else {
          console.error("Error creating workout: ", response.statusText);
        }
      } catch (error) {
        console.error("Error creating workout: ", error);
      }
    },
    [getWorkouts]
  );

  const onDelete = useCallback(
    async (idWorkout: number) => {
      try {
        const response = await deleteWorkout(idWorkout);
        if (response.ok) {
          getWorkouts();
        } else {
          console.error("Error deleting workout: ", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting workout: ", error);
      }
    },
    [getWorkouts]
  );

  return { workouts, getWorkouts, newWorkout, onDelete };
};
