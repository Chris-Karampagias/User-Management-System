import { useDispatch } from "react-redux";
import {
  setLocalStorageKeepMeLoggedIn,
  setLocalStorageUser,
} from "../utilities";
import { updateUser, clearUser } from "../models/user/actions";

export const useUserTools = () => {
  const dispatch = useDispatch();

  const setUser = (user) => {
    setLocalStorageUser(user);
    dispatch(updateUser(user));
  };

  const removeUserAndPreference = () => {
    localStorage.clear();
    dispatch(clearUser());
  };

  const setUserLoggedInPreference = (preference) => {
    setLocalStorageKeepMeLoggedIn(preference);
  };

  const isUserLoggedIn = () => {
    return localStorage.getItem("user");
  };

  const getUserInfo = () => {
    let user = localStorage.getItem("user");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  };

  const isUserAdmin = () => {
    const user = getUserInfo();
    if (!user) {
      return false;
    }
    return user.role === "admin";
  };

  return {
    setUser,
    removeUserAndPreference,
    setUserLoggedInPreference,
    isUserLoggedIn,
    isUserAdmin,
    getUserInfo,
  };
};
