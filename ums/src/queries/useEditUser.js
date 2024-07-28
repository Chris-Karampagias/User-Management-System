import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser as updateUserApi } from "../api";
import { updateUser } from "../models/user/actions";
import { usePreviousLocationPathname } from "../hooks";
import { routesConfig } from "../app";
import { useCurrentPath } from "../hooks";
import { setLocalStorageCredentials } from "../utilities";

export const useEditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isHomePath } = useCurrentPath();
  const previousPathname = usePreviousLocationPathname();

  const {
    isPending: isLoadingEditUser,
    mutateAsync: editUser,
    isSuccess: editUserRequestFinished,
  } = useMutation({
    mutationFn: (userData) => updateUserApi(userData),
    onSuccess: (user) => {
      setLocalStorageCredentials(user.username, user.password);
      dispatch(updateUser(user));
      if (
        !isHomePath ||
        previousPathname !== routesConfig.authentication.browserRouter.path
      ) {
        navigate(-1);
      }

      if (previousPathname === routesConfig.authentication.browserRouter.path) {
        navigate(routesConfig.home.browserRouter.path);
      }
    },
  });

  return {
    isLoadingEditUser,
    editUser,
    editUserRequestFinished,
  };
};
