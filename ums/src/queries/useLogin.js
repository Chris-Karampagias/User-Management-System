import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api";
import { updateUser } from "../models/user/actions";
import { routesConfig } from "../app";
import {
  setLocalStorageCredentials,
  setLocalStorageKeepMeLoggedIn,
} from "../utilities";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isPending: isLoadingLogin,
    mutateAsync: loginUser,
    isSuccess: logInRequestFinished,
  } = useMutation({
    mutationFn: ({ username, password }) => getUser({ username, password }),
    onSuccess: (data, { keepMeLoggedIn }) => {
      const user = data?.[0];
      if (!user) {
        navigate(routesConfig.authentication.browserRouter.path);
        return;
      }
      dispatch(updateUser(user));
      setLocalStorageKeepMeLoggedIn(keepMeLoggedIn);
      setLocalStorageCredentials(user.username, user.password);

      if (user.isPasswordSafe) {
        navigate(routesConfig.home.browserRouter.path);
      } else {
        navigate(routesConfig.changePassword.browserRouter.path);
      }
    },
    onError: () => {
      navigate(routesConfig.authentication.browserRouter.path);
    },
  });

  return {
    isLoadingLogin,
    loginUser,
    logInRequestFinished,
  };
};
