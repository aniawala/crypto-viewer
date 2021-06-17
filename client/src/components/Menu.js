import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FilterValue from "../common/FilterValue";
import OrderType from "../common/OrderType";
import {
  defaultCryptosAmount,
  defaultFilterValue,
  defaultOrderType,
  maxCryptos,
  minCryptos,
  stepForCryptosAmount,
} from "../common/config";

const useStyles = makeStyles({
  root: {
    width: 840,
  },
  item: {
    width: 200,
  },
});

const Menu = ({ setCryptosAmount, setFilterBy, setOrder }) => {
  const classes = useStyles();
  const [tempCryptosAmount, setTempCryptosAmount] =
    useState(defaultCryptosAmount);
  const [tempFilterBy, setTempFilterBy] = useState(defaultFilterValue);
  const [tempOrder, setTempOrder] = useState(defaultOrderType);

  const handleInputChange = (event) => {
    let newAmount;
    if (event.target.value === "") newAmount = "";
    else if (event.target.value > maxCryptos) newAmount = maxCryptos;
    else if (event.target.value < 0) newAmount = 1;
    else newAmount = Number(event.target.value);
    setTempCryptosAmount(newAmount);
  };

  const handleFilterChange = (event) => {
    setTempFilterBy(event.target.value);
  };

  const handleOrderChange = (event, newOrder) => {
    setTempOrder(newOrder);
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    setCryptosAmount(tempCryptosAmount);
    setFilterBy(tempFilterBy);
    setOrder(tempOrder);
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <TextField
          label="Cryptocurrencies"
          type="number"
          color="secondary"
          value={tempCryptosAmount}
          onChange={handleInputChange}
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
        />
      </Grid>
      <Grid item>
        <FormControl variant="filled" fullWidth className={classes.item}>
          <InputLabel id="filter-label">Filter by:</InputLabel>
          <Select
            labelId="filter-label"
            value={tempFilterBy}
            onChange={handleFilterChange}
            color="secondary"
          >
            <MenuItem value={FilterValue.PRICE}>Price</MenuItem>
            <MenuItem value={FilterValue.MARKETCAP}>Market Cap</MenuItem>
            <MenuItem value={FilterValue.VOLUME}>Volume</MenuItem>
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
              <ArrowUpwardIcon fontSize="large" color="secondary" />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={OrderType.DESCENDING}>
            <Tooltip title="Descending">
              <ArrowDownwardIcon fontSize="large" color="secondary" />
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
