import { useEffect, useState } from "react";
import { Workout } from "../utils/types";
import { WorkoutCard } from "./WorkoutCard";
import { getUserWorkouts } from "../services/workoutService";
import { getUserId } from "../utils/jwtHelper";
import { ErrorMessage } from "./ErrorMessage";

export const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const getWorkouts = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("token") || "{}");
      const idUser = getUserId(tokens.token);
      const response = await getUserWorkouts(idUser, tokens.token);
      if (response.ok) {
        const workouts = await response.json();
        console.log("Workouts: ", workouts);
        setWorkouts(workouts);
      }
    } catch (error) {
      console.error("Error fetching workouts: ", error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div>
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard workout={workout} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <ErrorMessage message="No workouts found" />
        </div>
      )}
    </div>
  );
};
