import { useEffect, useState } from "react";

import { checkToken } from "../store/auth";
import { useAppDispatch, useAppSelector } from "./redux";

export const authStatus = (): boolean => {  
  const [isAuthenticated, setisAuthenticated] = useState(true);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    async function logInWithToken() {
      const ok = await dispatch(checkToken());
      setisAuthenticated(ok);
      return;
    }
    if (status === "not-authenticated") {
      logInWithToken();
    }
  }, []);

  return isAuthenticated;
};
