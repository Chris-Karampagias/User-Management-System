import { useEffect } from "react";
import { getLocalStorageCredentials, getLocalStorageKeepMeLoggedIn } from "../../utilities";
import { useLogin } from "../../queries/useLogin";

// eslint-disable-next-line react/prop-types
export function AuthenticationChecker({ children }) {
  const { loginUser } = useLogin();
  useEffect(() => {
    const keepMeLoggedIn = getLocalStorageKeepMeLoggedIn();
    const { username, password } = getLocalStorageCredentials() || {};

    if (keepMeLoggedIn && username && password) {
      loginUser({username, password, keepMeLoggedIn});
    }
  }, [loginUser]);
  return <>{children}</>;
}
