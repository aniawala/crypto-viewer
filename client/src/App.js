import { useState } from "react";
import { theme } from "./assets/theme";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Menu from "./components/Menu";
import Panel from "./components/Panel";
import {
  defaultCryptosAmount,
  defaultSortKey,
  defaultOrderType,
} from "./common/config";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.palette.grey.light,
  },
  paper: {
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("md")]: {
      width: 500,
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: 600,
    },
    [theme.breakpoints.between("lg", "xl")]: {
      width: 800,
    },
    [theme.breakpoints.up("xl")]: {
      width: 900,
    },
  },
  gridContainer: {
    height: "100vh",
    width: "100%",
  },
  header: {
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: 25,
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: 35,
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: 40,
    },
  },
});

const App = () => {
  const classes = useStyles();
  const [cryptosAmount, setCryptosAmount] = useState(defaultCryptosAmount);
  const [sortBy, setSortBy] = useState(defaultSortKey);
  const [order, setOrder] = useState(defaultOrderType);

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.root} justify="center">
        <Paper className={classes.paper} elevation={5}>
          <Grid
            container
            justify="space-evenly"
            direction="column"
            alignItems="center"
            className={classes.gridContainer}
          >
            <Grid item>
              <Typography variant="h3" className={classes.header}>
                Welcome to crypto viewer!
              </Typography>
            </Grid>
            <Grid item>
              <Menu
                setCryptosAmount={setCryptosAmount}
                setSortBy={setSortBy}
                setOrder={setOrder}
              />
            </Grid>
            <Grid item>
              <Panel
                cryptosAmount={cryptosAmount}
                sortBy={sortBy}
                order={order}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
