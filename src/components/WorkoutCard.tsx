import { Workout } from "../utils/types";
import image from "../assets/workout.jpg";

interface Props {
  workout: Workout;
  onDelete: (idWorkout: number) => void;
}

export const WorkoutCard: React.FC<Props> = ({ workout, onDelete }) => {
  return (
    <article className="flex flex-col items-center bg-slate-100 shadow-2xl border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={image || "ruta/por/defecto.jpg"}
        alt={`Imagen de ${workout.name}`}
      />
      <div
        data-test="workout-card"
        className="flex flex-col justify-between p-4 leading-normal"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {workout.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {workout.description}
        </p>
        {workout.date && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {new Date(workout.date).toLocaleDateString()}
          </p>
        )}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {workout.result}
        </p>
        <button
          data-test={`delete-${workout.name}`}
          type="button"
          onClick={() => onDelete(workout.idWorkout)}
          className="px-3 py-2 w-20 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
