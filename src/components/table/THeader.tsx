export const THeader = () => {
  const HEADERS = ["ID", "Username", "Email", "Nombre", "Apellidos"] as const;
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr data-test="table-header">
        {HEADERS.map((th) => (
          <th key={th} scope="col" className="px-6 py-3">
            {th}
          </th>
        ))}
      </tr>
    </thead>
  );
};
