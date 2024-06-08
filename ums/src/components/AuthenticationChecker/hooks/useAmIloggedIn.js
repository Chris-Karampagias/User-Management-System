import { useEffect } from "react";

export const useAmIloggedIn = () => {
  useEffect(() => {
    if (
      !localStorage.getItem("user") &&
      window.location.pathname !== "/authentication"
    ) {
      return window.location.replace("/authentication");
    }

    if (
      localStorage.getItem("user") &&
      window.location.pathname === "/authentication"
    ) {
      return window.location.replace("/home");
    }
  }),
    [window.location.pathname];
};