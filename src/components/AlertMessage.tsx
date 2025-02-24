import React from "react";
import messageFactory from "../utils/messageFactory";
import { MessageType } from "../types/error";

interface AlertMessageProps {
  type: MessageType;
  text?: string; // Texto opcional (si no se pasa, usa el default)
}

// Este componente recibe un tipo de mensaje y un texto opcional
// Dependiendo del tipo de mensaje, renderiza un mensaje diferente
// Si no se pasa texto, usa el texto por defecto
const AlertMessage: React.FC<AlertMessageProps> = ({ type, text }) => {
  const { defaultText, color, icon } = messageFactory(type);

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-200`}
    >
      <div className="flex flex-row items-center text-center gap-2">
        <span>{icon}</span>
        <p className="font-medium">{text || defaultText}</p>{" "}
      </div>
      {/* Usa el texto personalizado o el por defecto */}
    </div>
  );
};

export default AlertMessage;
