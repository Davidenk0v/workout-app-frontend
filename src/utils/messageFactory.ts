import { MessageType } from "../types/error";

interface Message {
  defaultText: string;
  color: string;
  icon: string;
}
//Este es un ejemplo de un factory que crea un mensaje dependiendo del tipo de mensaje que se le pase
//En este caso, el factory recibe un tipo de mensaje y devuelve un mensaje con un texto por defecto, un color y un icono
//Si el tipo de mensaje no coincide con los tipos de mensaje definidos, se devuelve un mensaje de advertencia
const messageFactory = (type: MessageType): Message => {
  const messages: Record<MessageType, Message> = {
    success: {
      defaultText: "¡Operación exitosa!",
      color: "green",
      icon: "✅",
    },
    error: {
      defaultText: "¡Ocurrió un error!",
      color: "red",
      icon: "❌",
    },
    warning: {
      defaultText: "Advertencia: revisa los datos.",
      color: "yellow",
      icon: "⚠️",
    },
  };

  return messages[type] || messages["warning"];
};

export default messageFactory;
