import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { AuthenticationChecker } from "../AuthenticationChecker";
import { useSelector } from "react-redux";
import { userSelector } from "../../models/user/selectors";

export function Layout() {
  const user = useSelector(userSelector);
  return (
    // Need to pass a key to component in order to force a rerender and not receive obsolete user data
    <AuthenticationChecker key={user?.id}>
      <Header />
      <Outlet />
    </AuthenticationChecker>
  );
}
