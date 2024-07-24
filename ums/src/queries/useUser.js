import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api";

export const useUser = (userId) => {
  const {
    data,
    isLoading: isFetchingUser,
    isError: userFetchError,
    isFetched: userFetched,
  } = useQuery({
    queryKey: ["user", userId],
    // eslint-disable-next-line no-unused-vars
    queryFn: ({ queryKey: [_, userId] }) => getUser({ userId }),
  });

  return {
    user: data?.length > 0 ? data[0] : {},
    isFetchingUser,
    userFetchError,
    userFetched,
  };
};
