import { createTheme } from "@mui/material/styles";

const theme = (mode) => {
  return createTheme({
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
        fontWeight: 100,
        color: "#919EAB",
      },
    },
    palette: {
      mode: mode,
      primary: {
        light: "#dff2ee",
        main: "#008768",
        dark: "#004b31",
        contrastText: "#FFFFFF",
      },
      ...(mode === "dark" && {
        background: {
          default: "#161C24", // dark mode background color
          paper: "#212B36", // dark mode paper color
        },
        secondary: {
          // light: "#dff2ee",
          main: "#FFFFFF",
          // dark: "#004b31",
          contrastText: "#000000",
        },
      }),
      ...(mode === "light" && {
        background: {
          default: "#FFFFFF", // light mode background color
          paper: "#F5F5F5", // light mode paper color
        },
        secondary: {
          // light: "#dff2ee",
          main: "#000000",
          // dark: "#004b31",
          contrastText: "#FFFFFF",
        },
      }),
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });
};

export default theme;
