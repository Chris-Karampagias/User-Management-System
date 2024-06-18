import { useEffect } from "react";
import { useUserTools } from "../../../hooks";
import { useUser } from "../../../queries/useUser";
import { getLocalStorageCredentials, getLocalStorageKeepMeLoggedIn } from "../../../utilities";

export const useEnforceLoginPreference = () => {
  const { user, userRefetch, userIsFetched } = useUser();
  const { setUser } = useUserTools();

  useEffect(() => {
    const isKeepMeLoggedInSelected = getLocalStorageKeepMeLoggedIn();
    if (isKeepMeLoggedInSelected) {
      const userCredentials = getLocalStorageCredentials();

      if(userCredentials) {
        userRefetch(userCredentials.username, userCredentials.password);
      }
    }
  }, [userRefetch]);
  console.log(userIsFetched)

  useEffect(() => {
    if(user?.id && userIsFetched) {
      setUser(user);
    }
  }, [user, setUser, userIsFetched]);
}
