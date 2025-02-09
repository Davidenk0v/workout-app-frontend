import { createBrowserRouter } from "react-router-dom";
import { Login } from "./login.tsx";
import { Register } from "./register.tsx";
import { Users } from "./users.tsx";

import { MyWorkouts } from "./my-workouts.tsx";
import { Profile } from "./profile.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/my-workouts",
        element: <MyWorkouts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
