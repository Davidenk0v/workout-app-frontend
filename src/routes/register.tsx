import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { RegisterForm } from "../components/RegisterForm";
import { TitlePage } from "../components/TitlePage";

export const Register = () => {
  const auth = useAuth();
  if (auth?.isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="container mx-auto p-5 w-screen h-screen">
      <TitlePage title="Registro" />
      <RegisterForm />
    </div>
  );
};
