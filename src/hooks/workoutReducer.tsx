import { Workout } from "../types/workout";

type WorkoutAction =
  | { type: "ADD"; payload: Workout }
  | { type: "REMOVE"; payload: number }
  | { type: "UPDATE"; payload: Workout; id: number };

type initialState = Workout[];

export const workoutReducer = (state: initialState, action: WorkoutAction) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((workout) => workout.idWorkout !== action.payload);
    case "UPDATE":
      return state.map((workout) =>
        workout.idWorkout === action.id ? action.payload : workout
      );
    default:
      return state;
  }
};
