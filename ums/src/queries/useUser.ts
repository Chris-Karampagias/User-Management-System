import { useQuery } from "@tanstack/react-query";
import getUser from "../api/getUser";

export const useUser = (userId: string | null) => {
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });

  return { user, isLoadingUser };
};