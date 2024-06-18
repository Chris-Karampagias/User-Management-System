import { useSelector } from "react-redux";
import { userSelector } from "../models/user/selectors";

export const useIsPasswordSafe = () => {
  const user = useSelector(userSelector);

  return !!user?.isPasswordSafe;
};
