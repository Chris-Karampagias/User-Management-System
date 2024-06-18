import { useEnforceLoginPreference, useAmIloggedIn } from "./hooks";

// eslint-disable-next-line react/prop-types
export function AuthenticationChecker({ children }) {
  useEnforceLoginPreference();
  useAmIloggedIn();

  return <>{children}</>;
}
