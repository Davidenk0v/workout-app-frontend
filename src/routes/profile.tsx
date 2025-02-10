import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ProfileData } from "../components/ProfileData";

export const Profile = () => {
  const auth = useAuth();

  if (!auth?.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto p-5 w-screen h-screen">
      <h1 className="mb-4 text-3xl font-extrabold text-center p-4 text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Mi cuenta
        </span>
      </h1>
      <ProfileData />
    </div>
  );
};
