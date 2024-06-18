import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from '../queryClient';
import { getUser, createUser, updateUser } from "../api";

export const useUser = () => {
  const [innerUsername, setInnerUserName] = useState("");
  const [innerPassword, setInnerPassword] = useState(null);

  const userRefetch = (username, password = null) => {
    setInnerUserName(username);
    setInnerPassword(password);
  };

  const {
    data: user,
    isFetching: userIsFetching,
    isFetched: userIsFetched,
  } = useQuery({
    queryKey: ["user", innerUsername, innerPassword],
    queryFn: () => getUser(innerUsername, innerPassword),
    enabled: !!innerUsername,
    refetchOnWindowFocus: false,
  });

  const clearUserQuery = () => {
    queryClient.cancelQueries(["user", innerUsername, innerPassword])
  }

  const { isPending: isCreatingUser, mutate: createUserFromData } = useMutation(
    { mutationFn: createUser }
  );

  const {
    data: updatedUser,
    isPending: isUpdatingUser,
    mutate: updateUserFromData,
  } = useMutation({ mutationFn: updateUser });

  return {
    user: user?.length > 0 ? user[0] : null,
    userIsFetching,
    userIsError: !!user,
    userIsFetched,
    userRefetch,
    isCreatingUser,
    createUserFromData,
    isUpdatingUser,
    updateUserFromData,
    updatedUser,
    clearUserQuery
  };
};
