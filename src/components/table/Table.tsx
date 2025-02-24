import { THeader } from "../../components/table/THeader";
import { TBody } from "./TBody";
import { TableProvider } from "../../context/TableContext";

export const Table: React.FC = () => {
  return (
    <TableProvider>
      <THeader />
      <TBody />
    </TableProvider>
  );
};
