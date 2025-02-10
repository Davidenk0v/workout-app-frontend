import { useEffect, useState } from "react";
import { NewWorkout, Workout } from "../utils/types";
import { WorkoutCard } from "./WorkoutCard";
import {
  createWorkout,
  deleteWorkout,
  getUserWorkouts,
} from "../services/workoutService";
import { getUserId } from "../utils/jwtHelper";
import { ErrorMessage } from "./ErrorMessage";
import { NewWorkoutForm } from "./NewWorkoutForm";
import { NewButton } from "./NewButton";

export const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Función para abrir el modal
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const getWorkouts = async () => {
    try {
      const idUser = getUserId();
      const response = await getUserWorkouts(idUser);
      if (response.ok) {
        const workouts = await response.json();
        setWorkouts(workouts);
      }
    } catch (error) {
      console.error("Error fetching workouts: ", error);
    }
  };

  const newWorkout = async (workout: NewWorkout) => {
    try {
      const response = await createWorkout(workout);
      if (response.ok) {
        getWorkouts();
      }
    } catch (error) {
      console.error("Error creating workout: ", error);
    }
  };

  const onDelete = async (idWorkout: number) => {
    try {
      const response = await deleteWorkout(idWorkout);
      if (response.ok) {
        getWorkouts();
      }
    } catch (error) {
      console.error("Error deleting workout: ", error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div>
      <NewButton openModal={openModal} />
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.idWorkout}
              workout={workout}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <ErrorMessage message="No workouts found" />
        </div>
      )}
      {isModalOpen && (
        <NewWorkoutForm closeModal={closeModal} onCreate={newWorkout} />
      )}
    </div>
  );
};
