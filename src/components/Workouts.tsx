import { WorkoutCard } from "./WorkoutCard";

export const Workouts: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Mis entrenos
      </h1>
      <div className="grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </div>
    </div>
  );
};
