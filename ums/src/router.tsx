import { createBrowserRouter, Navigate } from "react-router-dom";
import { Homepage, AllUsers, ChangePassword, Authentication } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace={true} />,
  },
  {
    path: "/home",
    element: <Homepage />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "/all-users",
    element: <AllUsers />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

export default router;
