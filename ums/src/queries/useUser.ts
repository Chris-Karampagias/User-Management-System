import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getUser from "../api/getUser";

export const useUser = () => {
  const [innerUsername, setInnerUserName] = useState('');
  const [innerPassword, setInnerPassword] = useState('');

  const userRefetch = (username: string, password: string) => {
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
    enabled: !!innerUsername && !!innerPassword,
    refetchOnWindowFocus: false,
  });

  return {
    user: user?.length > 0 ? user[0] : null,
    userIsFetching,
    userIsError: !!user,
    userIsFetched,
    userRefetch,
  };
};
