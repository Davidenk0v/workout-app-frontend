import { useEffect, useCallback } from "react";
import { WorkoutCard } from "./WorkoutCard";
import { getUserId } from "../utils/jwtHelper";
import AlertMessage from "./AlertMessage";
import { deleteWorkoutSwal, newWorkoutSwal } from "../utils/sweetAlert";
import Button from "./Button";
import { useSEO } from "../hooks/useSEO";
import { useWorkouts } from "../hooks/useWorkouts";

export const Workouts: React.FC = () => {
  const { workouts, newWorkout, onDelete, getWorkouts } = useWorkouts();

  useSEO({
    title: "Mis entrenamientos",
    description: "Aquí puedes ver tus entrenamientos",
  });

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
