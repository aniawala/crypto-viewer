import "@fontsource/handlee";
import "@fontsource/quicksand";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"],
    h3: {
      fontFamily: ["Handlee", "cursive"].join(","),
    },
    button: {
      fontWeight: 600,
    },
  },
  palette: {
    type: "dark",
    grey: {
      light: "#181818",
      medium: "#141414",
      dark: "#121212",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
  },
});
