import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Divider, Typography } from "@mui/material";

import { ListUserActionTable, Layout, AddActionForm } from "../components";
import { useAppSelector } from "../hooks/redux";
import RouteGuard from "../components/RoutGuard";

export default function Home() {
  // Obtengo del store los datos del usuario
  const { user } = useAppSelector((state: any) => state.auth);
  const { name } = user;

  return (
    <RouteGuard>
      <Layout title="Mis Acciones" pageDescription="Acciones preferidas de cada usuario">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h4">Mis Acciones</Typography>
          <Typography variant="h4">{name}</Typography>
        </Box>
        <Divider sx={{ marginBottom: 4 }} />
        <AddActionForm />
        <ListUserActionTable />
      </Layout>
    </RouteGuard>
  );
}
