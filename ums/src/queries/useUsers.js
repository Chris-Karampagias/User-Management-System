import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUsers } from "../api/getUsers";
import { userSelector } from "../models/user/selectors";

export const useUsers = () => {
  const isUserLoggedIn = !!useSelector(userSelector).id;
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: isUserLoggedIn,
    initialData: () => [],
  });

  return { users, isLoadingUsers };
};
