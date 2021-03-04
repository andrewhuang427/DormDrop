import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const CheckoutButtonContainer = styled.div``;

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

const OrderSummaryContainer = styled.div``;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  orderCard: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  removeIcon: {
    position: "relative",
    textAlign: "right",
  },
  orderDetails: {},
}));

const OrderSummaryHeading = styled.h3`
  font-size: 15px;
`;

const LoadingContainer = styled.span`
  margin-left: 20px;
`;

const calculatePrice = (cart) => {
  let price = 0;
  for (let i = 0; i < cart.length; ++i) {
    const order = cart[i];
    price += Number(order.price);
  }
  return price;
};

function Cart({ cart, removeFromCart }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push("/checkout");
    }, 600);
  };

  return (
    <div>
      {cart.map((order, index) => {
        return (
          <CartItem
            key={index}
            order={order}
            orderIndex={index}
            removeFromCart={removeFromCart}
          />
        );
      })}
      {cart.length > 0 ? (
        <>
          <Paper elevation={3} className={classes.orderCard}>
            <OrderSummaryContainer>
              <OrderSummaryHeading>Order Summary</OrderSummaryHeading>
              <Divider />
              <OrderDetails>
                <SingleOrderContainer>
                  <FieldContainer>
                    <Field>Total Price</Field>
                    <Value>$ {calculatePrice(cart).toFixed(2)}</Value>
                  </FieldContainer>
                </SingleOrderContainer>
              </OrderDetails>
            </OrderSummaryContainer>
          </Paper>
          <CheckoutButtonContainer>
            <FullWidthButton onClick={handleCheckout}>
              Checkout
              {loading ? (
                <LoadingContainer>
                  <BeatLoader size={10} margin={2} color={"white"} />
                </LoadingContainer>
              ) : (
                ""
              )}
            </FullWidthButton>
          </CheckoutButtonContainer>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Cart;

const RestaurantName = styled.h3`
  font-size: 15px;
  margin: 10px auto;
`;

const Price = styled.h3`
  margin: 10px auto;
  font-size: 15px;
  color: #3ab44b;
`;

const OrderDetails = styled.div`
  font-size: 13px;
`;

const SingleOrderContainer = styled.div`
  margin: 20px auto;
`;

const FieldContainer = styled.div`
  margin: 3px auto;
  display: flex;
  justify-content: space-between;
`;

const Field = styled.div`
  display: inline-block;
  font-weight: 600;
  text-align: left;
`;

const Value = styled.div`
  display: inline-block;
  margin-left: 5px;
  color: gray;
  text-align: right;
`;

function CartItem({ order, orderIndex, removeFromCart }) {
  const classes = useStyles();

  const handleRemoveFromCart = () => {
    removeFromCart(orderIndex);
  };

  return (
    <Paper elevation={3} className={classes.orderCard}>
      <div className={classes.removeIcon}>
        <IconButton onClick={handleRemoveFromCart}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.orderDetails}>
        <RestaurantName>{order.restaurant}</RestaurantName>
        <Price>$ {order.price.toFixed(2)}</Price>
        <Divider />
        <OrderDetails>
          {order.orderDetails.map((singleOrder, index) => {
            return (
              <>
                <SingleOrderContainer key={index}>
                  {order.orderDetails.length > 1 ? (
                    <FieldContainer>
                      <Field>Order {index + 1}</Field>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.restaurant !== undefined &&
                  singleOrder.restaurant !== "" ? (
                    <FieldContainer>
                      <Field>Restaurant</Field>
                      <Value>{singleOrder.restaurant}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.name !== undefined && singleOrder.name !== "" ? (
                    <FieldContainer>
                      <Field>Customer Name</Field>
                      <Value>{singleOrder.name}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.orderNumber !== undefined &&
                  singleOrder.orderNumber !== "" ? (
                    <FieldContainer>
                      <Field>Order #</Field>
                      <Value>{singleOrder.orderNumber}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.includeDrink === true ? (
                    <FieldContainer>
                      <Field>Drink</Field>
                      <Value>{singleOrder.drink}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.includeSauces === true ? (
                    <FieldContainer>
                      <Field>Sauces</Field>
                      <Value>{singleOrder.sauces}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.includeUtensils === true ? (
                    <FieldContainer>
                      <Field>Include Utensils</Field>
                      <Value>Yes</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.includeSauces === true ? (
                    <FieldContainer>
                      <Field>Sauces</Field>
                      <Value>{singleOrder.sauces}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.additionalInstructions !== "" &&
                  singleOrder.additionalInstructions !== undefined ? (
                    <FieldContainer>
                      <Field>Additional Instructions</Field>
                      <Value>{singleOrder.additionalInstructions}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                </SingleOrderContainer>
                <Divider />
              </>
            );
          })}
        </OrderDetails>
      </div>
    </Paper>
  );
}
