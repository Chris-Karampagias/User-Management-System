import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUser, createUser, updateUser } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const [innerUsername, setInnerUserName] = useState("");
  const [innerPassword, setInnerPassword] = useState(null);
  const [ isEnabled, setIsEnabled ] = useState(false)
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetching: userIsFetching,
    isFetched: userIsFetched,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(innerUsername, innerPassword),
    enabled: isEnabled,
  });

  const userDoesNotExists = user?.length === 0;

  useEffect(() => {
    if(userDoesNotExists && isEnabled) {
      setIsEnabled(false);
    }
  }, [userDoesNotExists, isEnabled])

  const userRefetch = (username, password = null) => {
    setIsEnabled(true);
    setInnerUserName(username);
    setInnerPassword(password);
  };

  const clearUserQuery = () => {
    setIsEnabled(false);
    queryClient.removeQueries({
      queryKey: ["user"],
    });
  };

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
    clearUserQuery,
  };
};
