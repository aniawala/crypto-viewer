import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SortKey from "../common/SortKey";
import OrderType from "../common/OrderType";
import {
  defaultCryptosAmount,
  defaultSortKey,
  defaultOrderType,
  maxCryptos,
  minCryptos,
  stepForCryptosAmount,
} from "../common/config";

const useStyles = makeStyles({
  root: {
    // width: 600,
  },
  item: {
    width: 130,
  },
});

const Menu = ({ setCryptosAmount, setSortBy, setOrder }) => {
  const classes = useStyles();
  const [tempCryptosAmount, setTempCryptosAmount] =
    useState(defaultCryptosAmount);
  const [tempSortBy, setTempSortBy] = useState(defaultSortKey);
  const [tempOrder, setTempOrder] = useState(defaultOrderType);

  const handleCryptosAmountChange = (event) => {
    let newAmount;
    if (event.target.value === "") newAmount = "";
    else if (event.target.value > maxCryptos) newAmount = maxCryptos;
    else if (event.target.value <= 0) newAmount = 1;
    else newAmount = Number(event.target.value);
    setTempCryptosAmount(newAmount);
  };

  const handleSortByChange = (event) => {
    setTempSortBy(event.target.value);
  };

  const handleOrderChange = (event, newOrder) => {
    setTempOrder(newOrder);
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    setCryptosAmount(tempCryptosAmount);
    setSortBy(tempSortBy);
    setOrder(tempOrder);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={3}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <TextField
          label="Cryptocurrencies"
          type="number"
          color="secondary"
          value={tempCryptosAmount}
          onChange={handleCryptosAmountChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: minCryptos,
            max: maxCryptos,
            step: stepForCryptosAmount,
          }}
          variant="filled"
          className={classes.item}
          size="small"
        />
      </Grid>
      <Grid item>
        <FormControl
          size="small"
          variant="filled"
          fullWidth
          className={classes.item}
        >
          <InputLabel id="sort-label">Sort by:</InputLabel>
          <Select
            labelId="sort-label"
            value={tempSortBy}
            onChange={handleSortByChange}
            color="secondary"
          >
            <MenuItem value={SortKey.PRICE}>Price</MenuItem>
            <MenuItem value={SortKey.MARKETCAP}>Market Cap</MenuItem>
            <MenuItem value={SortKey.VOLUME}>Volume</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={tempOrder}
          exclusive
          onChange={handleOrderChange}
        >
          <ToggleButton value={OrderType.ASCENDING}>
            <Tooltip title="Ascending">
              <ArrowUpwardIcon color="secondary" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={OrderType.DESCENDING}>
            <Tooltip title="Descending">
              <ArrowDownwardIcon color="secondary" />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          className={classes.item}
          onClick={handleApplyFilters}
        >
          Apply filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default Menu;
