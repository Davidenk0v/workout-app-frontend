import { ButtonType } from "../types/error";

interface Message {
  defaultText: string;
  color: string;
}
const buttonFactory = (type: ButtonType): Message => {
  const buttons: Record<ButtonType, Message> = {
    submit: {
      defaultText: "Enviar",
      color: "green",
    },
    delete: {
      defaultText: "Eliminar",
      color: "red",
    },
    edit: {
      defaultText: "Editar",
      color: "yellow",
    },
    add: {
      defaultText: "Añadir",
      color: "blue",
    },
    logout: {
      defaultText: "Cerrar sesión",
      color: "bg-transparent",
    },
  };

  return buttons[type] || buttons["submit"];
};

export default buttonFactory;
