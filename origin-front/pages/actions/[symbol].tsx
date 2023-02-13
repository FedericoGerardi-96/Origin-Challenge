import { useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Box, Divider, Typography } from "@mui/material";

import { Layout } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TwelveDataForm } from "../../components/TwelveData/TwelveDataForm";
import RouteGuard from "../../components/RoutGuard";
import { TwelveDataGraphic } from "../../components/TwelveData";
import { startGetActiveAction } from "../../store/actions/thunks";
import { hiddeGraphic } from "../../store/TwelveData/thunks";

const Action: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cleanDataGraphic = async () => {
      const ok = await dispatch(hiddeGraphic());
      return;
    };
    cleanDataGraphic();
  }, []);

  // Obtengo del store los datos de la accion seleccionada
  const { activeAction } = useAppSelector((state: any) => state.action);
  const { name: actionName, currency } = activeAction;
  // Obtengo del store los datos del usuario
  const { user } = useAppSelector((state: any) => state.auth);

  const { name } = user;

  // Obtener el simbolo de la accion por el parametro
  const router = useRouter();
  let symbol: string = router.asPath.split("/")[2];

  useEffect(() => {
    const actionCheck = async () => {
      const ok = await dispatch(startGetActiveAction());
      if (!ok) router.replace("/");
    };
    actionCheck();
  }, []);

  return (
    <Layout
      title="Mis Acciones"
      pageDescription="Acciones preferidas de cada usuario"
    >
      <RouteGuard>
        <Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography variant="h4">{symbol} -</Typography>
              <Typography variant="h4">{actionName} -</Typography>
              <Typography variant="h4">{currency}</Typography>
            </Box>
            <Typography variant="h4">{name}</Typography>
          </Box>
          <Divider />
          <TwelveDataForm symbol={symbol} />
          <TwelveDataGraphic symbol={symbol} />
        </Box>
      </RouteGuard>
    </Layout>
  );
};

export default Action;
