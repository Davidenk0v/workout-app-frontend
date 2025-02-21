import { Workout } from "../types/workout";
import image from "../assets/workout.jpg";

interface Props {
  workout: Workout;
  onDelete: (idWorkout: number) => void;
}

export const WorkoutCard: React.FC<Props> = ({ workout, onDelete }) => {
  return (
    <article className="flex flex-col md:flex-row items-center bg-slate-100 shadow-xl border border-gray-200 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300">
      <img
        className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={image}
        alt={`Imagen de ${workout.name}`}
        onError={(e) => (e.currentTarget.src = "ruta/por/defecto.jpg")}
      />
      <div
        data-test="workout-card"
        className="flex flex-col justify-between p-4 w-full leading-normal"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {workout.name}
        </h5>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          {workout.description}
        </p>
        {workout.date && (
          <p className="mb-3 text-sm text-gray-500">
            {new Date(workout.date).toLocaleDateString()}
          </p>
        )}
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          {workout.result}
        </p>
        <button
          data-test={`delete-${workout.name}`}
          type="button"
          onClick={() => onDelete(workout.idWorkout)}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition-all"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
