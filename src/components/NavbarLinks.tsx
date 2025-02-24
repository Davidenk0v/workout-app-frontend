import Button from "./Button";
import { LinkNav } from "./LinkNav";

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
  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {admin && <LinkNav dataTest="user-link" to="/users" text="Usuarios" />}
        {isLoggedIn ? (
          <>
            <LinkNav
              dataTest="workout-link"
              to="/my-workouts"
              text="Mis entrenos"
            />
            <LinkNav dataTest="profile-link" to="/profile" text="Mis perfil" />
            <li>
              <Button onClick={logout} text="Logout" type="logout" />
            </li>
          </>
        ) : (
          <>
            <LinkNav dataTest="login-button" to="/" text="Login" />
            <LinkNav
              dataTest="register-button"
              to="/register"
              text="Register"
            />
          </>
        )}
      </ul>
    </div>
  );
};
