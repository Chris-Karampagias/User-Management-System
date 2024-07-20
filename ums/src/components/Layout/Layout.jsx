import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { AuthenticationChecker } from "../AuthenticationChecker";
export function Layout() {
  return (
    <>
      <Header />
      <AuthenticationChecker>
        <Outlet />
      </AuthenticationChecker>
    </>
  );
}
