import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import CreditCardInput from "./CreditCardInput";
import Cart from "./Cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  orderSummaryContainer: {
    display: "flex",
  },
  columnHeading: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  container: { marginTop: theme.spacing(3) },
  orderSummary: {
    width: "60%",
    padding: theme.spacing(2),
  },
  paymentAndDeliveryDetails: {
    width: "40%",
    padding: theme.spacing(2),
  },
  paymentSlip: {
    padding: theme.spacing(2),
  },
  formFieldContainer: {
    padding: theme.spacing(2),
  },
}));

function OrderSummary({ cart }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.orderSummaryContainer}>
        <div className={classes.orderSummary}>
          <h3 className={classes.columnHeading}>Order Summary</h3>
          <Divider />
          <div className={classes.container}>
            <Cart cart={cart} />
          </div>
        </div>
        <div className={classes.paymentAndDeliveryDetails}>
          <h3 className={classes.columnHeading}>Payment / Delivery Details</h3>
          <Divider />
          <div className={classes.container}>
            <Paper className={classes.paymentSlip}>
              <div className={classes.formFieldContainer}>
                {/* <FormControl component="fieldset">
                  <FormLabel component="legend">Drop-off Preference</FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="Hand it to me"
                  >
                    <FormControlLabel
                      value="Hand it to me"
                      control={<Radio color="primary" />}
                      label="Hand it to me"
                    />
                    <FormControlLabel
                      value="Leave it at my door"
                      control={<Radio color="primary" />}
                      label="Leave it at my door"
                    />
                  </RadioGroup>
                </FormControl> */}
              </div>
              <div className={classes.formFieldContainer}>
                <TextField
                  label={"Additional Instructions"}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className={classes.formFieldContainer}>
                <CreditCardInput />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
