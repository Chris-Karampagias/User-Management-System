import {
  AllUsers,
  ChangePassword,
  Homepage,
  Authentication,
  NewUser,
  UserDetails,
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
  userDetails: {
    browserRouter: {
      path: `/all-users/:userId`,
      element: <UserDetails />,
    },
    extraProps: {
      dynamicPath: (userId) => `/all-users/${userId}`,
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
