import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { Login } from "../utils/types";
import { login } from "../services/authService";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    const data: Login = {
      email,
      password,
    };
    try {
      const response = await login(data);
      localStorage.setItem("token", JSON.stringify(response.data));
      authContext?.setIsLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      console.log(error, "error al iniciar sesión");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") setEmail(e.target.value);
    if (e.target.id === "password") setPassword(e.target.value);
  };

  return (
    <div className="max-w-sm mx-auto text-center">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-black"
        >
          Your email
        </label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          value={email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Introduce your email"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Your password
        </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Introduce your password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        onClick={onSubmitLogin}
        className="text-white bg-emerald-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
    </div>
  );
};
