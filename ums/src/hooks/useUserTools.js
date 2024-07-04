import { useDispatch, useSelector } from "react-redux";
import {
  setLocalStorageKeepMeLoggedIn,
  setLocalStorageCredentials,
} from "../utilities";
import { updateUser, clearUser } from "../models/user/actions";
import { userSelector } from "../models/user/selectors";
import { useUser } from "../queries/useUser";

export const useUserTools = () => {
  const dispatch = useDispatch();
  const { clearUserQuery } = useUser();
  const user = useSelector(userSelector);
  const isUserAdmin = user?.role === "admin";
  const isUserLoggedIn = !!user?.id;

  const setUser = (user) => {
    setLocalStorageCredentials({
      username: user.username,
      password: user.password,
    });
    dispatch(updateUser(user));
  };

  const removeUserAndPreference = () => {
    clearUserQuery();
    localStorage.clear();
    dispatch(clearUser());
  };

  const setUserLoggedInPreference = (preference) => {
    setLocalStorageKeepMeLoggedIn(preference);
  };

  return {
    setUser,
    removeUserAndPreference,
    setUserLoggedInPreference,
    isUserLoggedIn,
    isUserAdmin,
    user,
  };
};
