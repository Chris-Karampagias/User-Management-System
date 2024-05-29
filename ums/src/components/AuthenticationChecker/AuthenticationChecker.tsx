import { useEffect, useState } from "react";
import getUsers from "../../api/getUsers";
import { useQuery } from "@tanstack/react-query";
import { findUser } from "../../utilities";
import { useDispatch } from "react-redux";
import { update } from "../../app/store";

export default function AuthenticationChecker({ children }) {
  const dispatch = useDispatch();
  const [enforceLoginPreference, setEnforceLoginPreference] = useState(true);

  const users = useQuery({ queryKey: ["users"], queryFn: getUsers });

  useEffect(() => {
    if (enforceLoginPreference && users.data) {
      console.log("first use effect");
      const keepMeLoggedIn = localStorage.getItem("keepMeLoggedIn");
      if (keepMeLoggedIn) {
        let currentUser = localStorage.getItem("user");
        if (currentUser) {
          currentUser = JSON.parse(currentUser);
          const username = currentUser?.username;
          const password = currentUser?.password;
          const { user } = findUser(users?.data, username);
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
  }, [dispatch, users?.data, enforceLoginPreference]);

  useEffect(() => {
    if (
      !localStorage.getItem("user") &&
      window.location.pathname !== "/authentication"
    ) {
      return window.location.replace("/authentication");
    }

    if (
      localStorage.getItem("user") &&
      window.location.pathname === "/authentication"
    ) {
      return window.location.replace("/home");
    }
  }),
    [window.location.pathname];

  return <>{children}</>;
}
