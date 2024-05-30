import { createBrowserRouter, Navigate } from "react-router-dom";
import { Homepage, AllUsers, ChangePassword, Authentication } from "./pages";

// FIXME move it somewhere else
export const RoutesConfig = {
  home: {
    browserRouter: {
      path: "/home",
      element: <Homepage />,
    },
    extraProps: {
      label: 'Home'
    }
  },
  authentication: {
    browserRouter: {
      path: '/authentication',
      element: <Authentication />,
    },
    extraProps: {
      label: 'Authentication'
    }
  },
  allUsers: {
    browserRouter: {
      path: "/all-users",
      element: <AllUsers />,
    },
    extraProps: {
      label: 'All Users'
    }
  },
  changePassword: {
    browserRouter: {
      path: "/change-password",
      element: <ChangePassword />,
    },
    extraProps: {
      label: 'Change Password'
    }
  },
}

const routes = Object.values(RoutesConfig).map(route => route.browserRouter)

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
