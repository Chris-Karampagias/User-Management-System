import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findUser } from "../../../utilities";
import { update } from "../../../app/store";
import { useUsers } from "../../../queries/useUsers";

export const useEnforceLoginPreference = () => {
  const [enforceLoginPreference, setEnforceLoginPreference] = useState(true);
  const dispatch = useDispatch();

  const { users } = useUsers();
  console.log(users)

  useEffect(() => {
    if (enforceLoginPreference && users) {
      console.log("first use effect");
      const keepMeLoggedIn = localStorage.getItem("keepMeLoggedIn");
      if (keepMeLoggedIn) {
        let currentUser = localStorage.getItem("user");
        if (currentUser) {
          currentUser = JSON.parse(currentUser);
          const username = currentUser?.username;
          const password = currentUser?.password;
          const { user } = findUser(users, username);
          if (user.password === password) {
            dispatch(update(user));
          }
        } else {
          if (window.location.pathname !== "/authentication") {
            return window.location.replace("/authentication");
          }
        }
      }
      setEnforceLoginPreference(false);
    }
  }, [dispatch, users, enforceLoginPreference]);
};