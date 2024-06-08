import { useEnforceLoginPreference, useAmIloggedIn } from "./hooks";

export default function AuthenticationChecker({ children }) {
  useEnforceLoginPreference();
  useAmIloggedIn();

  return <>{children}</>;
}
