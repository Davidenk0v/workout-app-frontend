export interface Workout {
  idWorkout: number;
  name: string;
  description: string;
  result: string;
  date: Date;
  user: number;
}

export type NewWorkout = Exclude<Workout, "idWorkout">;

export type WorkoutId = Pick<Workout, "idWorkout">;
