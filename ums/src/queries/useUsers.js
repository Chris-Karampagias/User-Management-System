import { useQuery } from "@tanstack/react-query";
import getUsers from "../api/getUsers";

export const useUsers = () => {
  const { data: users, isLoading: isLoadingUsers } =
    useQuery({ queryKey: ["users"], queryFn: getUsers });

  return { users, isLoadingUsers }
}