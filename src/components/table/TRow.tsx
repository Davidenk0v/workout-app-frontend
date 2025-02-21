interface Props {
  data: string;
  typeRow: string;
}

export const TRow: React.FC<Props> = ({ data, typeRow }) => {
  if (typeRow === "idUser") {
    return (
      <th
        data-test="th-id"
        key={data}
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data}
      </th>
    );
  } else {
    return (
      <td data-test="td-firstname" className="px-6 py-4">
        {data}
      </td>
    );
  }
};
