import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { routesConfig } from "../app";
import { deleteUser as deleteUserAPI } from "../api";

export const useDeleteUser = () => {
  const navigate = useNavigate();

  const {
    isPending: isDeletingUser,
    mutateAsync: deleteUser,
    isSuccess: userDeletionFinished,
    isError: userDeletionErrorOccured,
  } = useMutation({
    mutationFn: ({ userId }) => deleteUserAPI(userId),
    onSuccess: () => navigate(routesConfig.allUsers.browserRouter.path),
  });

  return {
    deleteUser,
    isDeletingUser,
    userDeletionFinished,
    userDeletionErrorOccured,
  };
};
