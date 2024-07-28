import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateUser as updateUserApi } from "../api";
import { routesConfig } from "../app";

export const useAdminEditUser = () => {
  const navigate = useNavigate();
  const {
    isPending: isUpdatingUser,
    mutateAsync: editUser,
    isSuccess: userUpdateFinished,
    isError: userUpdateFailed,
  } = useMutation({
    mutationFn: (userData) => updateUserApi(userData),
    onSuccess: () => navigate(routesConfig.allUsers.browserRouter.path),
  });
  return { editUser, isUpdatingUser, userUpdateFinished, userUpdateFailed };
};
