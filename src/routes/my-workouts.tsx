import { Workouts } from "../components/Workouts";

export const MyWorkouts = () => {
  return (
    <div className="container mx-auto p-5 w-screen h-screen flex flex-col items-center justify-center min-h-screen grow">
      <h1 className="mb-4 text-3xl font-extrabold text-center p-4 text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Mis entrenos
        </span>
      </h1>
      <Workouts />
    </div>
  );
};
