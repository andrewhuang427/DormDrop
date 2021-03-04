import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormField from "./FormField";
import styled from "styled-components";
import { isValidOrder } from "../../utils/index";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  width: 1060px;
  height: 600px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.5);
  outline: none;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 600px;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContainer = styled.div`
  width: 460px;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
`;

const FormHeadingContainer = styled.div``;

const FormHeading = styled.h3``;

const Instructions = styled.div`
  margin: 25px auto;
  font-size: 13px;
`;

const Form = styled.form``;

const FormFieldContainer = styled.div`
  margin: 20px auto;
`;

const DividerContainer = styled.div`
  margin: 30px auto;
`;

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

const orderSchema = (formProperties) => {
  let object = {};
  for (let i = 0; i < formProperties.length; ++i) {
    let property = formProperties[i];
    switch (property) {
      case "Order Number":
        object.orderNumber = "";
        break;
      case "Customer Name":
        object.name = "";
        break;
      case "Include Drink":
        object.includeDrink = false;
        object.drink = "";
        break;
      case "Utensils":
        object.includeUtensils = false;
        break;
      case "Include Sauces":
        object.includeSauces = false;
        object.sauces = "";
        break;
      case "Additional Instructions":
        object.additionalInstructions = "";
        break;
      default:
    }
  }
  return object;
};

export default function RestaurantForm({
  Details,
  open,
  setOpen,
  addToCart,
  active,
}) {
  const [orders, setOrders] = useState([
    orderSchema(Details.data.formProperties),
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOrder = () => {
    let newOrder = orderSchema(Details.data.formProperties);
    const newOrders = [...orders, newOrder];
    setOrders(newOrders);
  };

  const removeOrder = (index) => {
    let copy = [...orders];
    copy.splice(index, 1);
    console.log(copy);
    setOrders(copy);
  };

  const editOrder = (editedOrder, index) => {
    const copy = [...orders];
    copy[index] = editedOrder;
    console.log(copy);
    setOrders(copy);
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    console.log(orders);
    const order = {
      price: Details.data.price,
      restaurantId: Details.id,
      restaurant: Details.data.displayName,
      orderDetails: orders,
    };
    if (isValidOrder(order)) {
      addToCart(order);
    } else {
      // set errors
    }
  };

  return (
    <Modal onClose={handleClose} open={open}>
      <ModalContainer>
        <ContentWrapper>
          <ImageContainer>
            <Image src={Details.data.imageURL} />
          </ImageContainer>
          <FormContainer>
            <FormHeadingContainer>
              <FormHeading>{Details.data.displayName}</FormHeading>
            </FormHeadingContainer>
            <Instructions>
              <b>Instructions:</b> {Details.data.instructions}
            </Instructions>
            <Form onSubmit={handleSubmit}>
              {orders.map((order, index) => {
                return (
                  <>
                    <div key={index}>
                      <FormFieldContainer>Order {index + 1}</FormFieldContainer>
                      {Details.data.restaurants.length > 1 ? (
                        <SelectSingleRestaurant
                          Details={Details}
                          order={order}
                          editOrder={editOrder}
                          orderIndex={index}
                        />
                      ) : (
                        ""
                      )}
                      {Details.data.formProperties.map((field, fieldIndex) => {
                        return (
                          <FormFieldContainer key={fieldIndex}>
                            <FormField
                              name={field}
                              order={order}
                              editOrder={editOrder}
                              orderIndex={index}
                            />
                          </FormFieldContainer>
                        );
                      })}
                      {orders.length > 1 ? (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            removeOrder(index);
                          }}
                        >
                          Remove
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                    <DividerContainer>
                      <Divider />
                    </DividerContainer>
                  </>
                );
              })}
            </Form>
            {orders.length < Details.data.maxOrders && active ? (
              <FormFieldContainer>
                <FullWidthButton onClick={addOrder}>
                  Add additional order at no extra fee
                </FullWidthButton>
              </FormFieldContainer>
            ) : (
              ""
            )}
            {active ? (
              <FormFieldContainer>
                <FullWidthButton onClick={handleAddToCart}>
                  Add to cart
                </FullWidthButton>
              </FormFieldContainer>
            ) : (
              ""
            )}
          </FormContainer>
        </ContentWrapper>
      </ModalContainer>
    </Modal>
  );
}

function SelectSingleRestaurant({ Details, order, editOrder, orderIndex }) {
  const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    if (order.restaurant !== undefined) {
      setRestaurant(order.restaurant);
    }
  }, [order]);

  const handleChange = (event) => {
    const newRestaurant = event.target.value;
    setRestaurant(newRestaurant);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.restaurant = restaurant;
    editOrder(newOrder, orderIndex);
  }, [restaurant]);

  return (
    <>
      {restaurant === "" ? (
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-restaurant-label" error>
            Restaurant
          </InputLabel>
          <Select
            error
            labelId="select-restaurant-label"
            label="Restaurant"
            value={restaurant}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Details.data.restaurants.map((restaurant, index) => {
              return (
                <MenuItem value={restaurant} key={index}>
                  {restaurant}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error>Required Field</FormHelperText>
        </FormControl>
      ) : (
        <FormControl fullWidth variant="outlined">
          <InputLabel id="select-restaurant-label">Restaurant</InputLabel>
          <Select
            labelId="select-restaurant-label"
            label="Restaurant"
            value={restaurant}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Details.data.restaurants.map((restaurant, index) => {
              return (
                <MenuItem value={restaurant} key={index}>
                  {restaurant}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
}
