import { Box } from "@mui/material";

import style from "../styles/Loader.module.css";

export const Loader = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100vw",
        zIndex: 999,
      }}
    >
      <Box className={`${style.loader}`}>
        <Box className={`${style.circle}`}></Box>
        <Box className={`${style.circle}`}></Box>
        <Box className={`${style.circle}`}></Box>
        <Box className={`${style.circle}`}></Box>
      </Box>
    </Box>
  );
};
