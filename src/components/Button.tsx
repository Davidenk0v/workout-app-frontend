import React from "react";
import buttonFactory from "../utils/buttonFactory";
import { ButtonType } from "../types/error";
import { DeleteButton } from "./buttons/DeleteButton";
import { EditButton } from "./buttons/EditButton";
import { SubmitButton } from "./buttons/SubmitButton";
import { AddButton } from "./buttons/AddButton";
import { LogoutButton } from "./buttons/LogoutButton";

interface AlertMessageProps {
  type: ButtonType;
  text?: string; // Texto opcional (si no se pasa, usa el default)
  onClick: () => void;
}

// Este componente recibe un tipo de botón y un texto opcional
// Dependiendo del tipo de botón, renderiza un botón diferente
// Si no se pasa texto, usa el texto por defecto
const Button: React.FC<AlertMessageProps> = ({ type, text, onClick }) => {
  const { defaultText } = buttonFactory(type);

  if (type === "delete") {
    return <DeleteButton text={text || defaultText} onClick={onClick} />;
  }
  if (type === "edit") {
    return <EditButton text={text || defaultText} onClick={onClick} />;
  }
  if (type === "submit") {
    return <SubmitButton text={text || defaultText} onClick={onClick} />;
  }
  if (type === "add") {
    return <AddButton text={text || defaultText} onClick={onClick} />;
  }
  if (type === "logout") {
    return <LogoutButton text={text || defaultText} onClick={onClick} />;
  }
};

export default Button;
