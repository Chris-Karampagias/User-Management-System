import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUser, createUser } from "../api";

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

  const { isPending: isCreatingUser, mutate: createUserFromData } = useMutation(
    { mutationFn: createUser }
  );

  return {
    user: user?.length > 0 ? user[0] : null,
    userIsFetching,
    userIsError: !!user,
    userIsFetched,
    userRefetch,
    isCreatingUser,
    createUserFromData,
  };
};
