import { useEffect } from "react";
import { useUserTools } from "../../../hooks";
import { useUser } from "../../../queries/useUser";
import {
  getLocalStorageCredentials,
  getLocalStorageKeepMeLoggedIn,
} from "../../../utilities";
import { router } from "../../../router";
import { routesConfig } from "../../../app";

export const useEnforceLoginPreference = () => {
  const { user, userRefetch } = useUser();
  const { setUser } = useUserTools();

  useEffect(() => {
    const isKeepMeLoggedInSelected = getLocalStorageKeepMeLoggedIn();
    if (isKeepMeLoggedInSelected) {
      const userCredentials = getLocalStorageCredentials();

      if (userCredentials) {
        userRefetch(userCredentials.username, userCredentials.password);
      }
    }
  }, [userRefetch]);

  useEffect(() => {
    if (user) {
      setUser(user);
      router.navigate(routesConfig.home.browserRouter.path);
    }
  }, [user, setUser]);
};
