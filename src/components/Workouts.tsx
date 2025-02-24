import { useEffect, useState, useCallback } from "react";
import { NewWorkout, Workout } from "../types/workout";
import { WorkoutCard } from "./WorkoutCard";
import {
  createWorkout,
  deleteWorkout,
  getUserWorkouts,
} from "../services/workoutService";
import { getUserId } from "../utils/jwtHelper";
import AlertMessage from "./AlertMessage";
import { deleteWorkoutSwal, newWorkoutSwal } from "../utils/sweetAlert";
import Button from "./Button";
import { useSEO } from "../hooks/useSEO";

export const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useSEO({
    title: "Mis entrenamientos",
    description: "Aquí puedes ver tus entrenamientos",
  });

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

  const newWorkoutModel = useCallback((): void => {
    newWorkoutSwal(newWorkout, getUserId);
  }, [newWorkout]);

  const alertDelete = useCallback(
    (id: number) => {
      deleteWorkoutSwal(id, onDelete);
    },
    [onDelete]
  );

  useEffect(() => {
    getWorkouts();
  }, [getWorkouts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button text="Nuevo entreno" type="add" onClick={newWorkoutModel} />
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.idWorkout}
              workout={workout}
              onDelete={alertDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <AlertMessage text="No hay entrenamientos" type="warning" />
        </div>
      )}
    </div>
  );
};
