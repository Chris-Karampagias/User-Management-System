import { useEffect } from "react";
import { useUserTools } from "../../../hooks";
import { useIsPasswordSafe } from "../../../hooks";
import { router } from "../../../router";
import { routesConfig } from "../../../app";

export const useAmIloggedIn = () => {
  const { isUserLoggedIn, isUserAdmin } = useUserTools();
  const isPasswordSafe = useIsPasswordSafe();
  const authenticationPath = routesConfig.authentication.browserRouter.path;
  const homePath = routesConfig.home.browserRouter.path;
  const changePasswordPath = routesConfig.changePassword.browserRouter.path;

  useEffect(() => {
    if (!isUserLoggedIn && window.location.pathname !== authenticationPath) {
      router.navigate(authenticationPath);
      return;
    }
    if (isUserLoggedIn && !isUserAdmin) {
      if (window.location.pathname === authenticationPath) {
        router.navigate(homePath);
        return;
      }

      if (window.location.pathname !== changePasswordPath && !isPasswordSafe) {
        router.navigate(changePasswordPath);
        return;
      }

      if (window.location.pathname === changePasswordPath && isPasswordSafe) {
        router.navigate(homePath);
        return;
      }
    }

    if (isUserLoggedIn && isUserAdmin) {
      if (window.location.pathname === changePasswordPath) {
        router.navigate(homePath);
        return;
      }
    }
  }, [
    isPasswordSafe,
    isUserLoggedIn,
    isUserAdmin,
    authenticationPath,
    changePasswordPath,
    homePath,
  ]);
};
