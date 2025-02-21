import { MessageType } from "../types/error";

interface Message {
  defaultText: string;
  color: string;
  icon: string;
}
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
