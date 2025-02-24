import { useEffect, useState } from "react";
import { User, idUser } from "../types/user";
import { deleteById, getMe, updateUser } from "../services/userService";
import { getUserWorkouts } from "../services/workoutService";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import Button from "./Button";
import { useSEO } from "../hooks/useSEO";

export const ProfileData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [successfullyMessage, setSuccessfullyMessage] = useState<string>("");
  const auth = useAuth();
  const navigate = useNavigate();
  useSEO({
    title: user?.username || "Mi perfil",
    description: "Mis datos personales",
  });
  // Función para obtener datos del usuario
  const getUserData = async () => {
    try {
      const token = auth?.token;
      if (!token) return;
      const response = await getMe(token);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setEditedUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
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
    getUserData();
  }, [auth]);

  // Llamar `getNumberOfWorkouts()` solo cuando `user` cambie
  useEffect(() => {
    if (user) {
      getNumberOfWorkouts();
    }
  }, [user]);

  const deleteProfile = async (id: idUser) => {
    try {
      const response = await deleteById(id);
      console.log(response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const alertDelete = (id: idUser) => {
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
        navigate("/");
        deleteProfile(id);
      }
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editedUser) return;
    try {
      await updateUser({ idUser: editedUser.idUser }, editedUser);
      setUser(editedUser);
      setIsEditing(false);
      setSuccessfullyMessage("Cambios guardados correctamente");
      setTimeout(() => setSuccessfullyMessage(""), 5000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover">
          <span className="w-full h-full absolute opacity-50 bg-black"></span>
          {successfullyMessage && (
            <AlertMessage text={successfullyMessage} type="success" />
          )}
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
                {isEditing ? (
                  <div className="flex flex-col items-center">
                    <input
                      data-test="first-name-input"
                      type="text"
                      name="firstName"
                      value={editedUser?.firstName || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
                    />
                    <input
                      data-test="last-name-input"
                      type="text"
                      name="lastName"
                      value={editedUser?.lastName || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
                    />
                    <input
                      data-test="email-input"
                      type="email"
                      name="email"
                      value={editedUser?.email || ""}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
                    />
                    <button
                      data-test="save-button"
                      onClick={handleSave}
                      className="m-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-800 cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <h3
                      data-test="username"
                      className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2"
                    >
                      {user?.username ?? "Cargando..."}
                    </h3>
                    <div
                      data-test="name-lastname"
                      className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
                    >
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Cargando..."}
                    </div>
                    <div
                      data-test="email"
                      className="mb-2 text-blueGray-600 mt-10"
                    >
                      {user?.email ?? "Cargando..."}
                    </div>
                    <Button
                      type="edit"
                      text="Editar cuenta"
                      onClick={handleEditClick}
                    />
                    <Button
                      type="delete"
                      text="Eliminar"
                      onClick={() => alertDelete({ idUser: user!.idUser })}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
