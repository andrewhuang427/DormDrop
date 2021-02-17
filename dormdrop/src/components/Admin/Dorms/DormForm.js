import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styled from "styled-components";
import { db, createDorm } from "../../../firebase/firebase";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const FormContainer = styled.div`
  padding: 20px;
  min-width: 450px;
`;

const Form = styled.form``;

const TextFieldContainer = styled.div``;

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DormForm({ open, setOpen }) {
  const [name, setName] = useState("");
  const [campusRegion, setCampusRegion] = useState("");
  const [regions, setRegions] = useState([]);

  const regionRef = db.collection("campusRegions");

  const getRegions = () => {
    regionRef.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, data: doc.data() });
      });
      console.log(items);
      setRegions(items);
    });
  };

  useEffect(() => {
    getRegions();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      campusRegion,
    };
    createDorm(data);
    setOpen(false);
    setName("");
    setCampusRegion("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        New Dorm
      </DialogTitle>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <TextFieldContainer>
            <TextField
              label="Dorm Name"
              value={name}
              variant="outlined"
              onChange={(event) => {
                setName(event.target.value);
              }}
              fullWidth
            />
          </TextFieldContainer>
        </FormContainer>
        <FormContainer>
          <FormControl fullWidth>
            <InputLabel id="region-select-label">Campus Region</InputLabel>
            <Select
              labelId="region-select-label"
              value={campusRegion}
              onChange={(event) => {
                setCampusRegion(event.target.value);
              }}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {regions.map((region, index) => {
                return (
                  <MenuItem value={region.data.name} key={index}>
                    {region.data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormContainer>
        <DialogActions>
          <Button autoFocus type="submit" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
