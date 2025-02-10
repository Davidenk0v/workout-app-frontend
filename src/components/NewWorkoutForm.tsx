import { useState } from "react";
import { NewWorkout } from "../utils/types";
import { getUserId } from "../utils/jwtHelper";

interface Props {
  closeModal: () => void;
  onCreate: (workout: NewWorkout) => void;
}

export const NewWorkoutForm: React.FC<Props> = ({ closeModal, onCreate }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const workout = {
      name: name,
      description: description,
      date: new Date(),
      result: result,
      user: getUserId(),
    };
    onCreate(workout);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") setName(e.target.value);
    if (e.target.id === "description") setDescription(e.target.value);
    if (e.target.id === "result") setResult(e.target.value);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-300 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Añadir Workout</h2>

        <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Entrenamiento
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Introduce el nombre del entrenamiento"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Descripción
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="result"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tu resultado
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="result"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="gap-2 flex-col sm:flex-row flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
