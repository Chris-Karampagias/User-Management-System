import { AllUsers, Authentication, ChangePassword, Homepage } from "../pages";

export const routesConfig = {
  home: {
    browserRouter: {
      path: "/home",
      element: <Homepage />,
    },
    extraProps: {
      label: "Home",
    },
  },
  authentication: {
    browserRouter: {
      path: "/authentication",
      element: <Authentication />,
    },
    extraProps: {
      label: "Authentication",
    },
  },
  allUsers: {
    browserRouter: {
      path: "/all-users",
      element: <AllUsers />,
    },
    extraProps: {
      label: "All Users",
    },
  },
  changePassword: {
    browserRouter: {
      path: "/change-password",
      element: <ChangePassword />,
    },
    extraProps: {
      label: "Change Password",
    },
  },
};
