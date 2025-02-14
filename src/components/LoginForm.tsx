import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Login } from "../utils/types";
import { login } from "../services/authService";
import { ErrorMessage } from "./ErrorMessage";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");

  const onSubmitLogin = async (e: FormEvent) => {
    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessageEmail("Email is not valid");
      return;
    }
    const data: Login = {
      email,
      password,
    };
    try {
      const response = await login(data);
      localStorage.setItem("token", JSON.stringify(response.data));
      authContext?.setIsLoggedIn(true);
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error, "error al iniciar sesión");
      setErrorMessage("Usuario o contraseña incorrectos");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
  };

  return (
    <div className="max-w-sm mx-auto text-center">
      <div className="mb-5">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-black"
        >
          Your email
        </label>
        <input
          data-test="email"
          onChange={handleChange}
          type="email"
          id="email"
          value={email}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            errorMessageEmail ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Introduce tu correo electrónico"
          required
        />
        {errorMessageEmail && (
          <span
            data-test="bad-email"
            className="text-red-500 text-xs font-medium"
          >
            {errorMessageEmail}
          </span>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Your password
        </label>
        <input
          data-test="password"
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Introduce your password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        data-test="login-button"
        onClick={onSubmitLogin}
        className="text-white bg-emerald-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
    </div>
  );
};
