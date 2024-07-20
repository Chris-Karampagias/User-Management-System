import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api";
import { updateUser } from "../models/user/actions";
import { routesConfig } from "../app";
import {
  setLocalStorageCredentials,
  setLocalStorageKeepMeLoggedIn,
} from "../utilities";

export const useSignUp = (isForMyself, setUserCreationError) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isPending: isLoadingSignUp,
    mutateAsync: signUpUser,
    isSuccess: signUpRequestFinished,
  } = useMutation({
    // eslint-disable-next-line no-unused-vars
    mutationFn: ({ loggedIn, ...newUserData }) => createUser(newUserData),
    onSuccess: (user, userPayload) => {
      if (isForMyself) {
        dispatch(updateUser(user));
        setLocalStorageKeepMeLoggedIn(userPayload.loggedIn);
        setLocalStorageCredentials(user.username, user.password);

        if (user.isPasswordSafe) {
          navigate(routesConfig.home.browserRouter.path);
        } else {
          navigate(routesConfig.changePassword.browserRouter.path);
        }
      } else {
        navigate(routesConfig.allUsers.browserRouter.path);
      }
    },
    onError: (e) => {
      setUserCreationError(e.message || "Something went wrong");
    },
  });

  return {
    isLoadingSignUp,
    signUpUser,
    signUpRequestFinished,
  };
};
