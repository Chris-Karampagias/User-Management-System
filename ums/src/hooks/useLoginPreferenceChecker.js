import { useEffect, useState } from "react";
import {
  getLocalStorageCredentials,
  getLocalStorageKeepMeLoggedIn,
} from "../utilities";
import { useLogin } from "../queries/useLogin";

export function useLoginPreferenceChecker(setIsLoadingLogin) {
  const { loginUser, isLoadingLogin } = useLogin();
  useEffect(() => {
    const keepMeLoggedIn = getLocalStorageKeepMeLoggedIn();
    const { username, password } = getLocalStorageCredentials() || {};

    if (keepMeLoggedIn && username && password) {
      loginUser({ username, password, keepMeLoggedIn }).then();
    }
  }, [loginUser, setIsLoadingLogin]);

  return isLoadingLogin;
}
