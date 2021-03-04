import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  db,
  deleteRestaurant,
  deleteImageAttachedToRestaurant,
} from "../../../firebase/firebase";
import { integerToTime } from "../../../utils/index";
import styled, { ThemeConsumer } from "styled-components";

export default function CollapsibleTable() {
  const [restaurants, setRestaurants] = useState([]);

  const ref = db.collection("restaurants");

  const getRestaurants = () => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, data: doc.data() });
      });
      console.log(items);
      setRestaurants(items);
    });
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Display Name</TableCell>
            <TableCell align="right">Campus Region</TableCell>
            <TableCell align="right">Edit | Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((restaurant) => {
            console.log(restaurant);
            return <RestaurantRow key={restaurant.id} data={restaurant.data} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function RestaurantRow({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.displayName}
        </TableCell>
        <TableCell align="right">{data.campusRegion}</TableCell>
        <TableCell align="right">
          <IconButton>
            <EditIcon
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            />
          </IconButton>
          <IconButton onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} padding={2}>
              <RestaurantInfoDisplay data={data} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const collapseStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  paddedContainer: { padding: theme.spacing(2) },
  sectionHeading: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dayOfTheWeek: {
    marginRight: theme.spacing(1),
    fontWeight: 600,
  },
  hoursRow: { display: "flex" },
  timeSlot: { marginRight: theme.spacing(1) },
  prices: {},
}));

const daysOfTheWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function RestaurantInfoDisplay({ data }) {
  const classes = collapseStyle();
  return (
    <div>
      <Box margin={2}>
        <Paper className={classes.paddedContainer} variant="outlined">
          <h3>
            {data.displayName} • {data.campusRegion}
          </h3>
          <div>
            <span className={classes.dayOfTheWeek}>Max Orders:</span>
            <span>{data.maxOrders} Orders</span>
          </div>
          <div>
            <span className={classes.dayOfTheWeek}>Restaurants:</span>
            {data.restaurants.map((restaurant, index) => {
              return (
                <span>
                  {restaurant}
                  {index !== data.restaurants.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </div>
        </Paper>
      </Box>
      <Box margin={2}>
        <Paper className={classes.paddedContainer} variant="outlined">
          <h3 className={classes.sectionHeading}>Hours</h3>
          {daysOfTheWeek.map((day, index) => {
            return (
              <div className={classes.hoursRow} key={index}>
                <div className={classes.dayOfTheWeek}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}{" "}
                </div>
                {data.hours[day].length === 0 ? (
                  <div className={classes.timeSlot}>Closed</div>
                ) : (
                  <>
                    {data.hours[day].map((timeSlot, index) => {
                      return (
                        <div className={classes.timeSlot}>
                          {integerToTime(timeSlot.open)} -{" "}
                          {integerToTime(timeSlot.close)}
                          {index !== data.hours[day].length - 1 ? ",  " : ""}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            );
          })}
        </Paper>
      </Box>
      <Box margin={2}>
        <Paper className={classes.paddedContainer} variant="outlined">
          <h3 className={classes.sectionHeading}>Prices</h3>
          {data.prices.map((price, index) => {
            return (
              <div className={classes.hoursRow} key={index}>
                <div className={classes.dayOfTheWeek}>{price.campusRegion}</div>
                <div className={classes.timeSlot}>
                  $ {price.amount.toFixed(2)}
                </div>
              </div>
            );
          })}
        </Paper>
      </Box>
    </div>
  );
}
