import { createContext, useContext, useEffect, useState } from "react";
import { idUser, UserList } from "../types/user";
import Swal from "sweetalert2";
import { deleteById, getUsers } from "../services/userService";
import { deleteUserSwal } from "../utils/sweetAlert";

// Definición de la interfaz para el contexto
interface TableContextType {
  users: UserList;
  alertDelete: (id: idUser) => void;
}

// Creación del contexto con un valor inicial nulo
const TableContext = createContext<TableContextType | null>(null);
const { Provider } = TableContext;

interface Props {
  children: React.ReactNode; // Propiedades que recibe el componente, en este caso, los hijos
}

// Proveedor del contexto de la tabla
// Este componente se encarga de cargar la lista de usuarios y eliminar un usuario
// Se encarga de manejar la lógica de la tabla
// Se basa en el patrón de diseño Compound Components
// Los componentes hijos pueden acceder a los valores del contexto
export const TableProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<UserList>([]);

  const deleteUser = async (id: idUser) => {
    try {
      const response = await deleteById(id);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        getUserList();
      }
    } catch (e) {
      console.error("Error al eliminar el usuario", e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al eliminar el usuario. Intenta nuevamente.",
      });
    }
  };

  const getUserList = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      const response = await getUsers(token.token);
      if (response.ok) {
        const userList = await response.json();
        setUsers(userList);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la lista de usuarios. Intenta nuevamente.",
        });
      }
    } catch (e) {
      console.error("Error al cargar los usuarios", e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al cargar los usuarios. Intenta nuevamente.",
      });
    }
  };

  const alertDelete = (id: idUser) => {
    deleteUserSwal(id, deleteUser);
  };

  // useEffect para cargar la lista de usuarios cuando el componente se monta
  useEffect(() => {
    getUserList();
  }, []);

  // Valores que se proveerán a los componentes hijos
  const providerValues = { users, alertDelete };

  return (
    // Proveedor del contexto que envuelve a los hijos
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <Provider value={providerValues}>{children}</Provider>
    </table>
  );
};

// Hook personalizado para usar el contexto en otros componentes
export const useTable = () => useContext(TableContext);
// Reduce la cantidad de código repetitivo, ya que no es necesario pasar props a múltiples niveles.
// Facilita la organización del código al separar la lógica de negocio de los componentes de presentación.
