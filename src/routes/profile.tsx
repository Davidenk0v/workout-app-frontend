import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ProfileData } from "../components/ProfileData";
import { TitlePage } from "../components/TitlePage";

export const Profile = () => {
  const auth = useAuth();
  if (!auth?.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto p-5 w-screen h-screen">
      <TitlePage title="Mi perfil" />
      <ProfileData />
    </div>
  );
};
