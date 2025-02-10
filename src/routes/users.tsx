import { Table } from "../components/Table";

export const Users: React.FC = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-center p-4 text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Usuarios
        </span>
      </h1>
      <div className="relative overflow-x-auto">
        <Table />
      </div>
    </>
  );
};
