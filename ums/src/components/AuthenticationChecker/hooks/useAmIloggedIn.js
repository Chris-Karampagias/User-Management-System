import { useEffect } from "react";
import { useUserTools } from "../../../hooks";
import { useIsPasswordSafe } from "../../../hooks";
import { router } from "../../../router";

export const useAmIloggedIn = () => {
  const { isUserLoggedIn, isUserAdmin } = useUserTools();
  const isPasswordSafe = useIsPasswordSafe();
  useEffect(() => {
    if (!isUserLoggedIn && window.location.pathname !== "/authentication") {
      router.navigate("/authentication");
      return;
    }
    if (isUserLoggedIn && !isUserAdmin) {
      if (window.location.pathname === "/authentication") {
        router.navigate("/home");
        return;
      }

      if (window.location.pathname !== "/change-password" && !isPasswordSafe) {
        router.navigate("/change-password");
        return;
      }

      if (window.location.pathname === "/change-password" && isPasswordSafe) {
        router.navigate("/home");
        return;
      }
    }

    if (isUserLoggedIn && isUserAdmin) {
      if (window.location.pathname === "/change-password") {
        router.navigate("/home");
        return;
      }
    }
  }, [isPasswordSafe, isUserLoggedIn, isUserAdmin]);
};
