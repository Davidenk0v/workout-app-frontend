import { TitlePage } from "../components/TitlePage";
import { Workouts } from "../components/Workouts";

export const MyWorkouts = () => {
  return (
    <div className="container mx-auto p-5 w-screen h-screen flex flex-col items-center justify-center min-h-screen grow">
      <TitlePage title="Mis entrenos" />
      <section>
        <Workouts />
      </section>
    </div>
  );
};
