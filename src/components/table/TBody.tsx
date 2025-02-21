import { User } from "../../types/user";
import { TRow } from "./TRow";
import { useTable } from "../../context/TableContext";
import Button from "../Button";

export const TBody: React.FC = () => {
  const context = useTable();

  if (!context) {
    return null; // Si el contexto no está definido, no renderizar nada
  }

  const { users, alertDelete } = context;
  return (
    <tbody>
      {users.map((user: User) => (
        <tr
          data-test="table-row"
          key={user.idUser}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          {Object.entries(user).map(([key, value]) => (
            <TRow key={key} data={value} typeRow={key} />
          ))}

          <Button
            onClick={() => alertDelete({ idUser: user.idUser })}
            text="Eliminar"
            type="delete"
          />
        </tr>
      ))}
    </tbody>
  );
};
