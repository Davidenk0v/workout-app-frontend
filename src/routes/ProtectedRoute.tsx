import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const ProtectedRoute = () => {
  const auth = useAuth();

  if (auth === null) {
    return <div>Loading...</div>; // O puedes mostrar un spinner
  }

  return auth?.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
