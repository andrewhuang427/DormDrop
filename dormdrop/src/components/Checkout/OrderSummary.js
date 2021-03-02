import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MuiPhoneNumber from "material-ui-phone-number";
import CreditCardInput from "./CreditCardInput";
import Cart from "./Cart";
import BeatLoader from "react-spinners/BeatLoader";
import { db } from "../../firebase/firebase";
import styled from "styled-components";

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
    fontSize: "20px",
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
  phoneNumberInput: {
    fontFamily: "inherit",
  },
  sectionHeading: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: 0,
  },
  heading: {
    margin: 0,
    fontSize: "15px",
  },
  subheading: {
    margin: 0,
    fontSize: "13px",
  },
  formFieldContainer: {
    padding: theme.spacing(2),
  },
  pricingDetailsContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  tipContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  pricingHeading: {},
  tipSelect: { width: "100%" },
  tipSelectButton: { width: "25%" },
  divider: {
    margin: theme.spacing(2),
  },
}));

const StyledTabs = withStyles({
  root: {
    width: "100%",
  },
  indicator: {
    backgroundColor: "#3ab44b",
  },
})(Tabs);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 25,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: "inherit",
    "&:hover": {
      color: "#3ab44b",
      opacity: 1,
    },
    "&$selected": {
      color: "#3ab44b",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#3ab44b",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3ab44b",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#3ab44b",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#3ab44b",
      },
    },
  },
})(TextField);

const FullWidthButton = styled.button`
  outline: none;
  border-radius: 20px;
  width: 100%;
  border: none;
  display: flex;
  background: #3ab44b;
  color: white;
  padding: 15px 30px;
  margin-right: 10px;
  text-decoration: none;
  :hover {
    cursor: pointer;
    background: #3ab44bcc;
  }
`;

const LoadingContainer = styled.span`
  margin-left: 20px;
`;

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

const calculateTotalCost = (cart) => {
  let price = 0;
  for (let i = 0; i < cart.length; ++i) {
    const item = cart[i];
    price += item.price;
  }
  return price;
};

function OrderSummary({ cart }) {
  const classes = useStyles();
  const [dorms, setDorms] = useState([]);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [tip, setTip] = useState(1);
  const [otherSelected, setOtherSelected] = useState(false);
  const [totalPrice, setTotalPrice] = useState(calculateTotalCost(cart) + tip);
  const [loading, setLoading] = useState(false);

  const handleDeliveryLocationChange = (event) => {
    setDeliveryLocation(event.target.value);
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const campusLocationsRef = db.collection("dorms");

  const getDorms = () => {
    campusLocationsRef.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, data: doc.data() });
      });
      const sorted = sortDormNamesInAlphabeticalOrder(items);
      console.log(items);
      setDorms(sorted);
    });
  };

  useEffect(() => {
    getDorms();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  useEffect(() => {
    setTotalPrice(tip + calculateTotalCost(cart));
  }, [tip, cart]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setOtherSelected(false);
      setTip(1);
    } else if (newValue === 1) {
      setOtherSelected(false);
      setTip(2);
    } else if (newValue === 2) {
      setOtherSelected(false);
      setTip(3);
    } else {
      setOtherSelected(true);
    }
  };

  const handleCustomTipChange = (event) => {
    console.log(event.target.value);
    if (Number(event.target.value) < 0) {
      setTip(0);
    } else {
      setTip(Number(event.target.value));
    }
  };

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
          <h3 className={classes.columnHeading}>Delivery Details / Payment</h3>
          <Divider />
          <div className={classes.container}>
            <Paper className={classes.paymentSlip} elevation={3}>
              <div className={classes.sectionHeading}>
                <h3 className={classes.heading}>Delivery Details</h3>
              </div>
              <div className={classes.formFieldContainer}>
                <FormControl
                  variant="outlined"
                  style={{ width: "60%", marginRight: 10 }}
                >
                  <InputLabel id="select-delivery-location">
                    Delivery Location
                  </InputLabel>
                  <Select
                    labelId="select-delivery-location"
                    label="Delivery Location"
                    value={deliveryLocation}
                    onChange={handleDeliveryLocationChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dorms.map((dorm, index) => {
                      return (
                        <MenuItem value={dorm.data.name} key={index}>
                          {dorm.data.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  display="inline"
                  style={{ width: "35%" }}
                  label="Room Number"
                  variant="outlined"
                  value={roomNumber}
                  onChange={handleRoomNumberChange}
                />
              </div>
              <Divider className={classes.divider} />
              <div className={classes.sectionHeading}>
                <h3 className={classes.heading}>Contact Information</h3>
              </div>
              <div className={classes.formFieldContainer}>
                <MuiPhoneNumber
                  className={classes.phoneNumberInput}
                  defaultCountry={"us"}
                  variant="outlined"
                  fullWidth
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
                />
              </div>
              <Divider className={classes.divider} />
              <div className={classes.sectionHeading}>
                <h3 className={classes.heading}>Delivery Price</h3>
              </div>
              <div className={classes.pricingDetailsContainer}>
                <h3 className={classes.subheading}>Base Price</h3>
                <div className={classes.subheading} style={{ color: "gray" }}>
                  ${calculateTotalCost(cart).toFixed(2)}
                </div>
              </div>
              <div className={classes.pricingDetailsContainer}>
                <h3 className={classes.subheading}>Tip Amount</h3>
                <div className={classes.subheading} style={{ color: "gray" }}>
                  ${tip.toFixed(2)}
                </div>
              </div>
              <div className={classes.tipContainer}>
                <StyledTabs
                  value={tabValue}
                  onChange={handleChange}
                  aria-label="ant example"
                >
                  <StyledTab label="$1.00" />
                  <StyledTab label="$2.00" />
                  <StyledTab label="$3.00" />
                  <StyledTab label="Other" />
                </StyledTabs>
              </div>
              {otherSelected ? (
                <div className={classes.formFieldContainer}>
                  <CustomTextField
                    type="number"
                    label={"Input Tip Amount"}
                    variant="outlined"
                    onChange={handleCustomTipChange}
                    value={tip}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </div>
              ) : (
                ""
              )}
              <div className={classes.pricingDetailsContainer}>
                <h3 className={classes.subheading}>Total Price</h3>
                <div className={classes.subheading} style={{ color: "gray" }}>
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.sectionHeading}>
                <h3 className={classes.heading}>Payment Information</h3>
              </div>
              <div className={classes.formFieldContainer}>
                <CreditCardInput />
              </div>
              <div className={classes.formFieldContainer}>
                <FullWidthButton onClick={handleSubmit}>
                  Place Order
                  {loading ? (
                    <LoadingContainer>
                      <BeatLoader size={10} margin={2} color={"white"} />
                    </LoadingContainer>
                  ) : (
                    ""
                  )}
                </FullWidthButton>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
