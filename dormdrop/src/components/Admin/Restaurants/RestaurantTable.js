import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditRestaurantForm from "./EditRestaurantForm";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import {
  db,
  deleteRestaurant,
  deleteImageAttachedToRestaurant,
} from "../../../firebase/firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);

  const ref = db.collection("restaurants");

  const getRestaurants = () => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, data: doc.data() });
      });
      setRestaurants(items);
    });
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Restaurant</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Max Orders</TableCell>
            <TableCell align="right">Campus Region</TableCell>
            <TableCell align="right">Edit | Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((restaurant, index) => (
            <Row restaurant={restaurant} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ restaurant }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {restaurant.data.displayName}
        </TableCell>
        <TableCell align="right">
          {"$ " + Number(restaurant.data.price).toFixed(2)}
        </TableCell>
        <TableCell align="right">{restaurant.data.maxOrders + " Orders / Delivery"}</TableCell>
        <TableCell align="right">{restaurant.data.campusRegion}</TableCell>
        <TableCell align="right">
          <IconButton>
            <EditIcon
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              deleteRestaurant(restaurant.id);
              deleteImageAttachedToRestaurant(restaurant.data.imageRef);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditRestaurantForm
        open={modalOpen}
        setOpen={setModalOpen}
        restaurant={restaurant}
      />
    </Fragment>
  );
}
