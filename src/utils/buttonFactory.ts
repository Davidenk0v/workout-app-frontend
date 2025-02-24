import { ButtonType } from "../types/error";

interface Message {
  defaultText: string;
  color: string;
}

//Este es un ejemplo de un factory que crea un mensaje dependiendo del tipo de mensaje que se le pase
//En este caso, el factory recibe un tipo de mensaje y devuelve un mensaje con un texto por defecto y un color
//Si el tipo de mensaje no coincide con los tipos de mensaje definidos, se devuelve un mensaje de submit
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
