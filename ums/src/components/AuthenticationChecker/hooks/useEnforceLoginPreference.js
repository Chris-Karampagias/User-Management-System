import { useEffect, useState } from "react";
import { useUserTools } from "../../../hooks";
import { useUser } from "../../../queries/useUser";

export const useEnforceLoginPreference = () => {
  const [enforceLoginPreference, setEnforceLoginPreference] = useState(true);
  const { setUser, removeUserAndPreference } = useUserTools();
  const { user, userRefetch, userIsFetched } = useUser();

  useEffect(() => {
    if (user) {
      setUser(user);
    }

    if (!user && userIsFetched) {
      removeUserAndPreference();
    }
  }, [removeUserAndPreference, setUser, user, userIsFetched]);

  useEffect(() => {
    if (enforceLoginPreference) {
      const keepMeLoggedIn = JSON.parse(localStorage.getItem("keepMeLoggedIn"));
      if (keepMeLoggedIn) {
        let storedUser = null;
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
          storedUser = JSON.parse(currentUser);
          userRefetch(storedUser.username, storedUser.password);
        }
      } else {
        removeUserAndPreference();
      }
      setEnforceLoginPreference(false);
    }
  }, [enforceLoginPreference, removeUserAndPreference, userRefetch]);
};
