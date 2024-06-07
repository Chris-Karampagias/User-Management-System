import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../../../queries/useUser";
import { IuserData } from "../../../api";
import { updateUser } from "../../../models/user/actions";

export const useEnforceLoginPreference = () => {
  const [enforceLoginPreference, setEnforceLoginPreference] = useState(true);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<IuserData>({
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
      const keepMeLoggedIn = localStorage.getItem("keepMeLoggedIn");
      if (keepMeLoggedIn) {
        let storedUser: IuserData | null = null;
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
          storedUser = JSON.parse(currentUser) as IuserData;
          setUserInfo(storedUser);
        } else {
          if (window.location.pathname !== "/authentication") {
            return window.location.replace("/authentication");
          }
        }
      }
      setEnforceLoginPreference(false);
    }
  }, [dispatch, enforceLoginPreference]);
};
