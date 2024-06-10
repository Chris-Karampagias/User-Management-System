import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../../../queries/useUser";
import { updateUser } from "../../../models/user/actions";
import { useUserTools } from "../../../hooks";

export const useEnforceLoginPreference = () => {
  const [enforceLoginPreference, setEnforceLoginPreference] = useState(true);
  const dispatch = useDispatch();
  const { removeUserAndPreference } = useUserTools();
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    isPasswordSafe: false,
    role: "regular",
  });

  const { user, userRefetch } = useUser();

  useEffect(() => {
    if (userInfo.username && userInfo.password) {
      userRefetch(userInfo.username, userInfo.password);
    }
  }, [userRefetch, userInfo.username, userInfo.password]);

  useEffect(() => {
    if (user) {
      dispatch(updateUser(user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (enforceLoginPreference) {
      const keepMeLoggedIn = JSON.parse(localStorage.getItem("keepMeLoggedIn"));
      if (keepMeLoggedIn) {
        let storedUser = null;
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
          storedUser = JSON.parse(currentUser);
          setUserInfo(storedUser);
        }
      } else {
        removeUserAndPreference();
      }
      setEnforceLoginPreference(false);
    }
  }, [dispatch, enforceLoginPreference, removeUserAndPreference]);
};
