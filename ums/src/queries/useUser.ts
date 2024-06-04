import { useQuery } from "@tanstack/react-query";
import getUser from "../api/getUser";

export const useUser = (username: string, password: string) => {
  const {
    data: user,
    isFetching: isFetchingUser,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username, password),
    enabled: !!username,
    refetchOnWindowFocus: false,
  });

  return {
    user: user?.length > 0 ? user[0] : null,
    isFetchingUser,
    error: !!user,
    isFetched,
    refetch,
  };
};
