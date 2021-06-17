import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./assets/themes";
import Menu from "./components/Menu";
import Panel from "./components/Panel";
import {
  defaultCryptosAmount,
  defaultFilterValue,
  defaultOrderType,
} from "./common/config";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
  },
});

const App = () => {
  const classes = useStyles();
  const [cryptosAmount, setCryptosAmount] = useState(defaultCryptosAmount);
  const [filterBy, setFilterBy] = useState(defaultFilterValue);
  const [order, setOrder] = useState(defaultOrderType);

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
        <Menu
          setCryptosAmount={setCryptosAmount}
          setFilterBy={setFilterBy}
          setOrder={setOrder}
        />
        <Panel
          cryptosAmount={cryptosAmount}
          filterBy={filterBy}
          order={order}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default App;
