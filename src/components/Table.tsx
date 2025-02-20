import { useEffect, useState } from "react";
import { HEADERS } from "../utils/consts";
import { User, UserList } from "../utils/types";
import { deleteById, getUsers } from "../services/userService";
import Swal from "sweetalert2";

export const Table: React.FC = () => {
  const [users, setUsers] = useState<UserList>([]);

  const deleteUser = async (id: number) => {
    try {
      const response = await deleteById(id);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        getUserList();
      }
    } catch (e) {
      console.error("Error al eliminar el usuario", e);
    }
  };

  const getUserList = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      const response = await getUsers(token.token);
      if (response.ok) {
        const userList = await response.json();
        setUsers(userList);
      }
    } catch (e) {
      console.error("Error al cargar los usuarios", e);
    }
  };

  const alertDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el usuario?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr data-test="table-header">
          {HEADERS.map((th) => (
            <th key={th} scope="col" className="px-6 py-3">
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => (
          <tr
            data-test="table-row"
            key={user.idUser}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th
              data-test="th-id"
              key={user.idUser}
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {user.idUser}
            </th>
            <td data-test="td-firstname" className="px-6 py-4">
              {user.firstName}
            </td>
            <td data-test="td-lastname" className="px-6 py-4">
              {user.lastName}
            </td>
            <td data-test="td-username" className="px-6 py-4">
              {user.username}
            </td>
            <td data-test="td-email" className="px-6 py-4">
              {user.email}
            </td>
            <td data-test="td-accion" className="px-6 py-4">
              <button
                data-test={`delete-${user.idUser}`}
                onClick={() => alertDelete(user.idUser)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
