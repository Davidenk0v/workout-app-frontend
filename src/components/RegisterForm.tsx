import { FormEvent, useState } from "react";
import { register } from "../services/authService";
import { Register } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const authContext = useAuth();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const onRegister = async (event: FormEvent) => {
    event.preventDefault();

    const formData: Register = {
      email,
      password,
      username,
      firstName,
      lastName,
    };
    try {
      const response = await register(formData);
      console.log(response.data);
      localStorage.setItem("token", JSON.stringify(response.data));
      authContext?.setIsLoggedIn(true);
      navigate("/profile");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
    if (e.target.id === "firstname") setfirstName(e.target.value);
    if (e.target.id === "lastName") setLastName(e.target.value);
    if (e.target.id === "username") setUserName(e.target.value);
    if (!validateEmail(email)) {
      if (email.length === 0) setErrorMessage("");
      return setErrorMessage("Email is not valid");
    }
  };

  return (
    <form className="max-w-sm mx-auto text-center" onSubmit={onRegister}>
      <div className="mb-5">
        <label
          htmlFor="firstname"
          className="block mb-2 text-sm font-medium text-black"
        >
          Nombre
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="firstname"
          value={firstName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Introduce tu nombre"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-black"
        >
          Apellidos
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="lastName"
          value={lastName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Introduce tus apellidos"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-black"
        >
          Nombre de usuario
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="username"
          value={username}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Introduce tu nombre de usuario"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-black"
        >
          Correo electrónico
        </label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          value={email}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            errorMessage
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Introduce tu correo electrónico"
          required
        />
        {errorMessage && (
          <span className="text-red-500 text-xs font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Contraseña
        </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          value={password}
          placeholder="Introduce tu contraseña"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-emerald-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Register
      </button>
    </form>
  );
};
