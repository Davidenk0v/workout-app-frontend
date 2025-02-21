import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { LoginForm } from "../components/LoginForm";
import { TitlePage } from "../components/TitlePage";

export const Login = () => {
  const auth = useAuth();

  if (auth?.isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="container mx-auto p-5 w-screen h-screen flex-grow">
      <TitlePage title="Login" />
      <LoginForm />
    </div>
  );
};
