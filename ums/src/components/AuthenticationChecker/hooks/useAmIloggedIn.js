import { useEffect } from "react";
import { useUserTools } from "../../../hooks";
import { useIsPasswordSafe } from "../../../hooks";

export const useAmIloggedIn = () => {
  const { isUserLoggedIn, isUserAdmin } = useUserTools();
  const isPasswordSafe = useIsPasswordSafe();
  useEffect(() => {
    if (!isUserLoggedIn() && window.location.pathname !== "/authentication") {
      return window.location.replace("/authentication");
    }

    if (isUserLoggedIn() && !isUserAdmin()) {
      if (window.location.pathname === "/authentication") {
        return window.location.replace("/home");
      }

      if (window.location.pathname !== "/change-password" && !isPasswordSafe) {
        history.pushState(null, null, window.location.href);
        return (window.location.href = "/change-password");
      }

      if (window.location.pathname === "/change-password" && isPasswordSafe) {
        return window.location.replace("/home");
      }
    }

    if (isUserLoggedIn() && isUserAdmin()) {
      if (window.location.pathname === "/change-password") {
        return window.location.replace("/home");
      }
    }
  }, [isPasswordSafe, isUserLoggedIn, isUserAdmin]);
};
