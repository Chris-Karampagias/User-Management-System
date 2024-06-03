import { useQuery } from "@tanstack/react-query";
import getUser from "../api/getUser";

export const useUser = (username: string, password: string) => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username, password),
    enabled: !!username,
  });

  return {
    user: user?.length > 0 ? user[0] : null,
    isLoadingUser,
    error: !!user,
    isFetched,
    refetch,
  };
};
