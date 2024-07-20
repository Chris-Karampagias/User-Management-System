import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userSelector,
  isUserAdminSelector,
  isPasswordSafeSelector,
} from "../../models/user/selectors";
import { routesConfig } from "../../app";
import { useCurrentPath } from "../../hooks";
import { useLoginPreferenceChecker } from "../../hooks";
// eslint-disable-next-line react/prop-types
export function AuthenticationChecker({ children }) {
  const isLoadingLogin = useLoginPreferenceChecker();
  const isUserLoggedIn = !!useSelector(userSelector).id;
  const isPasswordSafe = useSelector(isPasswordSafeSelector);
  const isUserAdmin = useSelector(isUserAdminSelector);
  const navigate = useNavigate();
  const { isAuthenticationPath, isAllUsersPath, isNewUserPath } =
    useCurrentPath();

  useEffect(() => {
    if (isUserLoggedIn && isAuthenticationPath) {
      return navigate(routesConfig.home.browserRouter.path);
    }

    if (isUserLoggedIn && !isPasswordSafe) {
      return navigate(routesConfig.changePassword.browserRouter.path);
    }

    if (!isUserLoggedIn && !isAuthenticationPath) {
      navigate(routesConfig.authentication.browserRouter.path);
    }
  }, [isAuthenticationPath, isPasswordSafe, isUserLoggedIn, navigate]);

  useEffect(() => {
    if (!isUserAdmin && (isAllUsersPath || isNewUserPath)) {
      navigate(-1);
    }
  }, [isAllUsersPath, isNewUserPath, isUserAdmin, navigate]);

  return isLoadingLogin ? null : children;
}
