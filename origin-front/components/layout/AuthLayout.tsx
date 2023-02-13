import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Box, Grid, Typography } from "@mui/material";

interface Props {
  title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <ul className={`background`}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: { sm: 450 },
              backgroundColor: "#fff",
              padding: 3,
              borderRadius: 2,
              zIndex: 99,
            }}
          >
            <Typography variant="h2" sx={{ mb: 1 }}>
              {title}
            </Typography>
            {children}
          </Grid>
        </Grid>
      </main>
    </>
  );
};
