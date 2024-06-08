import { createBrowserRouter, Navigate } from "react-router-dom";
import { routesConfig } from "./app";

const routes = Object.values(routesConfig).map((route) => route.browserRouter);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace={true} />,
  },
  ...routes,
  {
    //No match route
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

export default router;
