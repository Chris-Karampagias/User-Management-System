import { useLocation } from "react-router-dom";
import { routesConfig } from "../app";

export function useCurrentPath() {
  const { pathname } = useLocation();
  const isHomePath = pathname === routesConfig.home.browserRouter.path;
  const isAuthenticationPath =
    pathname === routesConfig.authentication.browserRouter.path;
  const isNewUserPath = pathname === routesConfig.newUser.browserRouter.path;
  const isAllUsersPath = pathname === routesConfig.allUsers.browserRouter.path;
  const isChangePasswordPath =
    pathname === routesConfig.changePassword.browserRouter.path;

  return {
    isHomePath,
    isAuthenticationPath,
    isNewUserPath,
    isAllUsersPath,
    isChangePasswordPath,
  };
}
