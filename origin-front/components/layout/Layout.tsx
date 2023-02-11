import { FC, PropsWithChildren } from "react";

import Head from "next/head";

import { NavBar } from "../ui";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";

interface Props {
  title: string;
  pageDescription: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head>

      <nav>
        <NavBar />
      </nav>

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer>{/* TODO: mi custom footer */}</footer>
    </>
  );
};
