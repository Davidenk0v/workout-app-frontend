import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { isAdmin } from "../utils/jwtHelper";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const [admin, setAdmin] = useState(false);
  const auth = useAuth();

  const logout = () => {
    setAdmin(false);
    auth?.logout();
  };
  const checkAdmin = () => {
    const isAdminUser = isAdmin();
    setAdmin(isAdminUser);
  };

  useEffect(() => {
    checkAdmin();
  }, [auth]);

  const linkStyle =
    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  const isLoggedIn = auth?.isLoggedIn;
  return (
    <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <h1 className="mb-4 text-2xl font-extrabold text-center p-4 text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Workout app
            </span>
          </h1>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {admin && (
              <li>
                <Link to="/users" className={linkStyle}>
                  Usuarios
                </Link>
              </li>
            )}
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/my-workouts" className={linkStyle}>
                    Mis entrenos
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className={linkStyle}>
                    Mis perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 text-red-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-300 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className={linkStyle}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={linkStyle}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
