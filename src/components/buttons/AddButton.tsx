interface AddButtonProps {
  text: string;
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-primary btn-wide">
      {text}
    </button>
  );
};
