import { useEffect, useState } from "react";
import { User } from "../utils/types";
import { deleteById, getMe } from "../services/userService";
import { getUserWorkouts } from "../services/workoutService";

export const ProfileData = () => {
  const [user, setUser] = useState<User>();
  const [workouts, setWorkouts] = useState<number>();

  const getUserData = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("token") || "{}");
      const response = await getMe(tokens.token);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log(user);
        getNumberOfWorkouts();
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await deleteById(id);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "/";
      }
    } catch (e) {
      console.error("Error al eliminar el usuario", e);
    }
  };

  const getNumberOfWorkouts = async () => {
    if (user === undefined) return;
    const response = await getUserWorkouts(user.idUser);
    console.log("Response: ", response);
    if (response.ok) {
      const workoutsList = await response.json();
      console.log("Workouts: ", workoutsList);
      setWorkouts(workoutsList.length);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-blue-700 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {workouts}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Entrenos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user?.username}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  {user?.email}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <button
                      onClick={() => deleteUser(user?.idUser || 0)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
