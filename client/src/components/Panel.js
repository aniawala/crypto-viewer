import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { getCryptocurrencies } from "../api/requests";

const columns = [
  { id: "number", label: "#" },
  { id: "logo", label: "" },
  { id: "name", label: "Name" },
  { id: "symbol", label: "Symbol" },
  {
    id: "price",
    label: "Price",
    align: "right",
    format: (value) =>
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  },
  {
    id: "market_cap",
    label: "Market Cap",
    align: "right",
    format: (value) =>
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    description:
      "The total market value of a cryptocurrency's circulating supply.",
  },
  {
    id: "volume_24h",
    label: "Volume(24h)",
    align: "right",
    format: (value) =>
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    description:
      "A measure of how much of a cryptocurrency was traded in the last 24 hours.",
  },
];

const useStyles = makeStyles({
  root: {
    width: 850,
    maxHeight: 550,
  },
  table: {
    height: "100%",
    width: "100%",
  },
  tableCell: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 600,
  },
});

const Panel = ({ cryptosAmount, filterBy, order }) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchAndCacheRows = async () => {
      const params = {
        limit: cryptosAmount,
        sort: filterBy,
        sort_dir: order,
      };
      const [cryptocurrencies, error] = await getCryptocurrencies(params);
      if (error) alert(error);
      else {
        setRows(cryptocurrencies.data);
      }
    };
    setPage(0);
    fetchAndCacheRows();
  }, [cryptosAmount, filterBy, order]);

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.description) {
                  return (
                    <Tooltip title={column.description} key={column.id}>
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={classes.tableCell}
                      >
                        {column.label}
                      </TableCell>
                    </Tooltip>
                  );
                } else {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={classes.tableCell}
                    >
                      {column.label}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value =
                        column.id === "number"
                          ? i + 1 + page * rowsPerPage
                          : row[column.id];
                      if (column.id === "logo")
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Avatar alt={row[column.id]} src={row["logo"]} />
                          </TableCell>
                        );
                      else if (column.id === "name") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              href={row["website"]}
                              style={{ textTransform: "none" }}
                            >
                              {value}
                            </Button>
                          </TableCell>
                        );
                      } else
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Panel;
