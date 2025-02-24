import { Link } from "react-router-dom";
import Button from "./Button";

interface NavbarLinksProps {
  admin: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

export const NavbarLinks: React.FC<NavbarLinksProps> = ({
  admin,
  isLoggedIn,
  logout,
}) => {
  const linkStyle =
    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {admin && (
          <li>
            <Link data-test="user-link" to="/users" className={linkStyle}>
              Usuarios
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <>
            <li>
              <Link
                data-test="workout-link"
                to="/my-workouts"
                className={linkStyle}
              >
                Mis entrenos
              </Link>
            </li>
            <li>
              <Link
                data-test="profile-link"
                to="/profile"
                className={linkStyle}
              >
                Mis perfil
              </Link>
            </li>
            <li>
              <Button onClick={logout} text="Logout" type="logout" />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link data-test="login-button" to="/" className={linkStyle}>
                Login
              </Link>
            </li>
            <li>
              <Link
                data-test="register-button"
                to="/register"
                className={linkStyle}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
