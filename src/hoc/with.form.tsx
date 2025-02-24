import { FormEvent, useState } from "react";
import { login, register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Login, Register } from "../types/user";
import axios from "axios";

// Hoc para manejar la lógica de los formularios. Tanto la de register como la de logín, abstrayendo la lógica de los componentes en si.
// Recibe un componente, un estado inicial y el tipo de formulario que es.
// Devuelve un componente con la lógica de los formularios.
export const withForm = (
  Component: React.ComponentType<Login | Register>,
  initialState: Login | Register,
  typeOfForm: "login" | "register"
) => {
  const FormLogicComponent = (props: Login | Register) => {
    const authContext = useAuth();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(initialState);
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Función para validar el email con regex
    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    // Manejamos los input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormValues({ ...formValues, [id]: value });

      if (id === "email") {
        if (!validateEmail(value)) {
          setErrorMessageEmail("Email inválido");
        } else {
          setErrorMessageEmail("");
        }
      }
    };

    // Aqui manejamos el envio del formulario comprobando si el email es válido o si ha puesto la password
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (formValues.username === "") {
        setErrorMessage("Introduzca un nombre de usuario");
        return;
      }
      if (!validateEmail(formValues.email)) {
        setErrorMessageEmail("Email inválido");
        return;
      } else if (formValues.password === "") {
        setErrorMessage("Introduzca una contraseña");
        return;
      }

      try {
        let response = null;
        if (typeOfForm === "login") {
          response = await login(formValues);
        } else if (typeOfForm === "register") {
          response = await register(formValues);
        }

        if (response && response.data) {
          localStorage.setItem("token", JSON.stringify(response.data));
          authContext?.setIsLoggedIn(true);
          setErrorMessage("");
          navigate("/profile");
        } else {
          setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo.");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo.");
        }
      }
    };

    return (
      <Component
        {...props}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errorMessageEmail={errorMessageEmail}
        errorMessage={errorMessage}
      />
    );
  };

  return FormLogicComponent;
};
