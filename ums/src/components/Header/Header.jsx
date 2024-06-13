import { useSelector } from "react-redux";
import { userIdSelector } from "../../models/user/selectors";

export function Header() {
  const userId = useSelector(userIdSelector);
  return <div>Header {userId}</div>;
}
