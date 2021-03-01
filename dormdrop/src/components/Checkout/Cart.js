import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";

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
    marginBottom: theme.spacing(3),
  },
  removeIcon: {
    position: "relative",
    textAlign: "right",
  },
  orderDetails: {},
}));

function Cart({ cart, removeFromCart }) {
  return (
    <>
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
    </>
  );
}

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

const ButtonContainer = styled.div`
  margin: 10px auto;
  text-align: right;
`;

const SimpleButton = styled.button`
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
  font-family: inherit;
  font-weight: 600;
  color: #3ab44b;
  &:hover {
    color: #3ab44acc;
  }
`;

function CartItem({ order, orderIndex }) {
  const classes = useStyles();

  const handleRemoveFromCart = () => {};

  const handleEditOrder = () => {};

  return (
    <Paper elevation={3} className={classes.orderCard}>
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
                  {singleOrder.restaurant !== undefined ? (
                    <FieldContainer>
                      <Field>Restaurant</Field>
                      <Value>{singleOrder.restaurant}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.name !== undefined ? (
                    <FieldContainer>
                      <Field>Customer Name</Field>
                      <Value>{singleOrder.name}</Value>
                    </FieldContainer>
                  ) : (
                    ""
                  )}
                  {singleOrder.orderNumber !== undefined ? (
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
        <ButtonContainer>
          <SimpleButton onClick={handleEditOrder}>Edit</SimpleButton>
          <SimpleButton onClick={handleRemoveFromCart}>Remove</SimpleButton>
        </ButtonContainer>
      </div>
    </Paper>
  );
}

export default Cart;
