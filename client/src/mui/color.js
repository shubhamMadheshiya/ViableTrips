import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#dff2ee",
      main: "#008768",
      dark: "#004b31",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#FFFFFF",
      dark: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
    text: {
      light: "#9a9b9e",
      main: "#1e1f21",
      dark: "000000",
    },
    footer: "#121212",
  },
  typography: {
    h1: {
      fontSize: "1.8rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "1.125rem",
      fontWeight: 800,
    },
    h3: {
      fontSize: "0.875rem",
    },
    h4: {
      fontSize: "0.75rem",
    },
  },
});

export default theme;
