import "@fontsource/handlee";
import "@fontsource/quicksand";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"],
    h2: {
      fontFamily: ["Handlee", "cursive"].join(","),
    },
    button: {
      fontWeight: 600,
    },
  },
});
