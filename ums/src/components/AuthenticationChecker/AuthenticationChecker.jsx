import { useEnforceLoginPreference, useAmIloggedIn } from "./hooks";

// eslint-disable-next-line react/prop-types
export default function AuthenticationChecker({ children }) {
  useEnforceLoginPreference();
  useAmIloggedIn();

  return <>{children}</>;
}
