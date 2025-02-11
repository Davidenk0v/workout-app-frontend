import { useEffect, useState } from "react";
import { User } from "../utils/types";
import { deleteById, getMe } from "../services/userService";
import { getUserWorkouts } from "../services/workoutService";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthProvider";
import { refresh } from "../services/authService";

export const ProfileData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<number | null>(null);
  const auth = useAuth();
  // Función para obtener datos del usuario
  const getUserData = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("token") || "{}");
      const response = await getMe(tokens.token);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const test = async () => {
    const res = await refresh();
    console.log(res);
  };

  // Función para obtener el número de entrenos
  const getNumberOfWorkouts = async () => {
    if (!user) return; // Esperar a que `user` tenga datos
    try {
      const response = await getUserWorkouts(user.idUser);
      if (response.ok) {
        const workoutsList = await response.json();
        setWorkouts(workoutsList.length);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // Obtener datos del usuario al montar el componente
  useEffect(() => {
    test();
    getUserData();
  }, []);

  // Llamar `getNumberOfWorkouts()` solo cuando `user` cambie
  useEffect(() => {
    if (user) {
      getNumberOfWorkouts();
    }
  }, [user]);

  const deleteProfile = async (id: number) => {
    try {
      const response = await deleteById(id);
      console.log(response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const alertDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar tu cuenta?",
      text: "Se cerrará sesión y se eliminará tu cuenta para siempre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        auth?.logout();
        deleteProfile(id);
      }
    });
  };

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
          <span className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {workouts ?? "0"}
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
                  {user?.username ?? "Cargando..."}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  {user ? `${user.firstName} ${user.lastName}` : "Cargando..."}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  {user?.email ?? "Cargando..."}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <button
                      onClick={() => user && alertDelete(user.idUser)}
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
