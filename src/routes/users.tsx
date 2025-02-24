import { Table } from "../components/table/Table";
import { TitlePage } from "../components/TitlePage";
import { useSEO } from "../hooks/useSEO";

export const Users: React.FC = () => {
  useSEO({
    title: "Usuarios",
    description: "Gestión de usuarios",
  });
  return (
    <>
      <TitlePage title="Usuarios" />
      <div className="relative overflow-x-auto h-screen ">
        <Table />
      </div>
    </>
  );
};
