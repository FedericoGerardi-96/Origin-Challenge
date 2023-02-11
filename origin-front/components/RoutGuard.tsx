import { JSXElementConstructor, ReactElement, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Loader } from "./Loader";
import { checkToken } from "@/store/auth";
import { startGetAction } from "../store/actions/thunks";

const RouteGuard = (props: { children: ReactElement<unknown, string | JSXElementConstructor<unknown>> }) => {
  const { children } = props;

  const router = useRouter();

  const dispatch = useAppDispatch();

  // Estado que indica true en caso de que el usuario este correctamente autenticado
  const [authorized, setAuthorized] = useState(false);

  // Obtengo el estado actual del usuario del store
  const { status } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    const authCheck = async () => {
      if (status === "not-authenticated") {
        // En caso de que el usuario no entrara del login, verifico en caso de existir su token en el storage
        // y en caso de estar almacenado su token, obtengo el usuario devolviendo un true
        const ok = await dispatch(checkToken());
        // Si no existe un token o no es valido lo redirijo al login
        if (!ok) {
          setAuthorized(false);
          router.replace("/auth/login");
          return;
        }
      }
      // Si llegue hasta aca y existe un usuario logeado, obtengo sus acciones y las guardo en el storage
      await dispatch(startGetAction());
      setAuthorized(true);
    };
    authCheck();
  }, []);

  return authorized ? (
    children
  ) : (
    <>
      <Loader />
    </>
  );
};

export default RouteGuard;
