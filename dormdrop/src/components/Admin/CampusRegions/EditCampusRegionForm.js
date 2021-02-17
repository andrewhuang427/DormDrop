import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { updateCampusRegion } from "../../../firebase/firebase";

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

export default function EditCampusRegionForm({ open, setOpen, region }) {
  console.log(region);
  const [name, setName] = useState(region.data.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name };
    updateCampusRegion(region.id, data);
    setOpen(false);
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
        Edit Campus Region
      </DialogTitle>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <TextFieldContainer>
            <TextField
              label="Region Name"
              value={name}
              variant="outlined"
              onChange={(event) => {
                setName(event.target.value);
              }}
              fullWidth
            />
          </TextFieldContainer>
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
