interface Props {
  message: string;
}

export const SuccessMessage: React.FC<Props> = ({ message }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 text-center"
      role="alert"
    >
      <span data-test="succesfully" className="font-medium">
        {message}
      </span>
    </div>
  );
};
