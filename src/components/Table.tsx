import { useEffect, useState } from "react";
import { HEADERS } from "../utils/consts";
import { User, UserList } from "../utils/types";
import { getUsers } from "../services/userService";

export const Table: React.FC = () => {
  const [users, setUsers] = useState<UserList>([]);

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

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
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
            key={user.idUser}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th
              key={user.idUser}
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {user.idUser}
            </th>
            <td className="px-6 py-4">{user.firstName}</td>
            <td className="px-6 py-4">{user.lastName}</td>
            <td className="px-6 py-4">{user.username}</td>
            <td className="px-6 py-4">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
