import { useSelector } from "react-redux";
import { userId as userIdSelector } from "../../models/user/selectors";

export default function Header() {
  const userId = useSelector(userIdSelector)
  return <div>Header {userId}</div>;
}
