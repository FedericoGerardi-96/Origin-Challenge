import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E1E1E",
    },
    secondary: {
      main: "#3A64D8",
    },
    text: {
      primary: "#000",
    },
    info: {
      main: "#fff",
    },
  },
});
