import { useEnforceLoginPreference, useAmIloggedIn } from "./hooks";
import { ReactNode } from "react";

export default function AuthenticationChecker({
  children,
}: {
  children: ReactNode;
}) {
  useEnforceLoginPreference();
  useAmIloggedIn();

  return <>{children}</>;
}
