import { useUserTools } from "./useUserTools";

export const useIsPasswordSafe = () => {
  const { getUserInfo } = useUserTools();
  const user = getUserInfo();

  if (!user) {
    return false;
  }

  return user.isPasswordSafe;
};
