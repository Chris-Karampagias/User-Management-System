import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function usePreviousLocationPathname() {
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(null);

  useEffect(() => {
    if (prevPathname !== location.pathname) {
      setPrevPathname(location.pathname);
    }
  }, [location, prevPathname]);

  return prevPathname;
}
