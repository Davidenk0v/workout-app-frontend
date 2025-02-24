import { Table } from "../components/table/Table";
import { TitlePage } from "../components/TitlePage";

export const Users: React.FC = () => {
  return (
    <>
      <TitlePage title="Usuarios" />
      <div className="relative overflow-x-auto h-screen ">
        <Table />
      </div>
    </>
  );
};
