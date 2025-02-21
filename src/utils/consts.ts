export const API_URL = "http://localhost:8080" as const;

export const HEADERS = [
  "ID",
  "Nombre",
  "Apellidos",
  "Username",
  "Email",
] as const;

export const LOGIN_INPUTS = [
  {
    id: "email",
    label: "Correo electrónico",
    placeholder: "Introduce tu correo electrónico",
    type: "email",
  },
  {
    id: "password",
    label: "Contraseña",
    placeholder: "Introduce tu contraseña",
    type: "password",
  },
] as const;

export const REGISTER_INPUTS = [
  {
    id: "firstName",
    label: "Nombre",
    placeholder: "Introduce tu nombre",
    type: "text",
  },
  {
    id: "lastName",
    label: "Apellidos",
    placeholder: "Introduce tus apellidos",
    type: "text",
  },
  {
    id: "username",
    label: "Nombre de usuario",
    placeholder: "Introduce tu nombre de usuario",
    type: "text",
  },
  {
    id: "email",
    label: "Correo electrónico",
    placeholder: "Introduce tu correo electrónico",
    type: "email",
  },
  {
    id: "password",
    label: "Contraseña",
    placeholder: "Introduce tu contraseña",
    type: "password",
  },
] as const;
