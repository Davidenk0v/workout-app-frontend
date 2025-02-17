import { useEffect, useState, useCallback } from "react";
import { NewWorkout, Workout } from "../utils/types";
import { WorkoutCard } from "./WorkoutCard";
import {
  createWorkout,
  deleteWorkout,
  getUserWorkouts,
} from "../services/workoutService";
import { getUserId } from "../utils/jwtHelper";
import { ErrorMessage } from "./ErrorMessage";
import { NewButton } from "./NewButton";
import Swal from "sweetalert2";

export const Workouts: React.FC = () => {
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

  const newWorkoutModel = useCallback((): void => {
    Swal.fire({
      title: "Nuevo Entrenamiento",
      html: `<input id="swal-input1" class="swal2-input" placeholder="Nombre" required>
      <input id="swal-input2" class="swal2-input" placeholder="Descripción" required>
      <input id="swal-input4" class="swal2-input" placeholder="Resultado" required>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      preConfirm: () => {
        const name = (
          document.getElementById("swal-input1") as HTMLInputElement
        ).value;
        const description = (
          document.getElementById("swal-input2") as HTMLInputElement
        ).value;
        const result = (
          document.getElementById("swal-input4") as HTMLInputElement
        ).value;
        return {
          name,
          description,
          date: new Date(),
          result,
          user: getUserId(),
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        newWorkout(result.value);
      }
    });
  }, [newWorkout]);

  const alertDelete = useCallback(
    (id: number) => {
      Swal.fire({
        title: "¿Estás seguro de eliminar el entrenamiento?",
        text: "No podrás revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          onDelete(id);
        }
      });
    },
    [onDelete]
  );

  useEffect(() => {
    getWorkouts();
  }, [getWorkouts]);

  return (
    <div>
      <NewButton openModal={newWorkoutModel} />
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.idWorkout}
              workout={workout}
              onDelete={alertDelete}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <ErrorMessage message="No se encontraron entrenamientos" />
        </div>
      )}
    </div>
  );
};
