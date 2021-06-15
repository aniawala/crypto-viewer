import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./assets/themes";
import Menu from "./components/Menu";
import Panel from "./components/Panel";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Typography variant="h2">Welcome to crypto viewer!</Typography>
        <Menu />
        <Panel />
      </Grid>
    </ThemeProvider>
  );
};

export default App;
