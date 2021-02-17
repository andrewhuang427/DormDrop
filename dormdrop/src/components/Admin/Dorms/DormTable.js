import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditDormForm from "./EditDormForm";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { db, deleteDorm } from "../../../firebase/firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const sortDormNamesInAlphabeticalOrder = (dorms) => {
  dorms.sort(function (a, b) {
    if (a.data.name < b.data.name) {
      return -1;
    }
    if (a.data.name > b.data.name) {
      return 1;
    }
    return 0;
  });
  console.log(dorms);
  return dorms;
};

export default function BasicTable() {
  const classes = useStyles();
  const [dorms, setDorms] = useState([]);

  const ref = db.collection("dorms");

  const getDorms = () => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, data: doc.data() });
      });
      const sorted = sortDormNamesInAlphabeticalOrder(items);
      setDorms(sorted);
    });
  };

  useEffect(() => {
    getDorms();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dorm</TableCell>
            <TableCell align="right">Campus Region</TableCell>
            <TableCell align="right">Edit | Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dorms.map((dorm, index) => (
            <Row dorm={dorm} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row({ dorm }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {dorm.data.name}
        </TableCell>
        <TableCell align="right">{dorm.data.campusRegion}</TableCell>
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
              deleteDorm(dorm.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditDormForm open={modalOpen} setOpen={setModalOpen} dorm={dorm} />
    </Fragment>
  );
}
