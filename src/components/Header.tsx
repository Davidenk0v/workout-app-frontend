import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { isAdmin } from "../utils/jwtHelper";
import { Link, useNavigate } from "react-router-dom";
import { NavbarLinks } from "./NavbarLinks";

export const Header: React.FC = () => {
  const [admin, setAdmin] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth?.logout(); // Realiza el logout primero
    setAdmin(false);
    console.log("login", auth?.isLoggedIn); // Restablece el estado de admin
    navigate("/"); // Luego navega a la página principal
  };
  const checkAdmin = () => {
    const isAdminUser = isAdmin();
    setAdmin(isAdminUser);
  };

  useEffect(() => {
    checkAdmin();
  }, [auth, auth?.isLoggedIn]);

  const isLoggedIn = auth!.isLoggedIn;
  return (
    <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-4 rtl:space-x-reverse"
        >
          <h1 className="mb-4 text-2xl font-extrabold text-center p-4 text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Workout app
            </span>
          </h1>
        </Link>
        <NavbarLinks admin={admin} isLoggedIn={isLoggedIn} logout={logout} />
      </div>
    </nav>
  );
};
