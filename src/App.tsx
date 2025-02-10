import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { Login } from "./routes/login";
import { Register } from "./routes/register";
import { useAuth } from "./auth/AuthProvider";
import { Profile } from "./routes/profile";
import { Users } from "./routes/users";
import { MyWorkouts } from "./routes/my-workouts";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  const ProtectedRoute = () => {
    const auth = useAuth();

    return auth?.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/my-workouts" element={<MyWorkouts />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
