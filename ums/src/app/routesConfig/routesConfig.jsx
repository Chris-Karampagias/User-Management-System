import {
  AllUsers,
  ChangePassword,
  Homepage,
  Authentication,
  NewUser,
} from "../../pages";

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
  newUser: {
    browserRouter: {
      path: "/new-user",
      element: <NewUser />,
    },
    extraProps: {
      label: "New User",
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
