import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import FormField from "./FormField";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
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

const Instructions = styled.div``;

const Form = styled.form``;

const FormFieldContainer = styled.div`
  margin: 10px;
`;

const Button = styled.button`
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

export default function RestaurantForm({ Details, open, setOpen }) {
  const [orders, setOrders] = useState([{}]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOrder = () => {
    const newOrders = [...orders, {}];
    setOrders(newOrders);
  };

  const removeOrder = (index) => {};

  const editOrder = (editedOrder, index) => {
    const copy = [...orders];
    copy[index] = editedOrder;
    console.log(copy);
    setOrders(copy);
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
            <Instructions>{Details.data.instructions}</Instructions>
            <Form onSubmit={handleSubmit}>
              {orders.map((order, index) => {
                return (
                  <div key={index}>
                    <FormFieldContainer>Order {index + 1}</FormFieldContainer>
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
                  </div>
                );
              })}
            </Form>
            {orders.length < Details.data.maxOrders ? (
              <FormFieldContainer>
                <Button onClick={addOrder}>Add Additional Order</Button>
              </FormFieldContainer>
            ) : (
              ""
            )}
            <FormFieldContainer>
              <Button>Add To Cart</Button>
            </FormFieldContainer>
          </FormContainer>
        </ContentWrapper>
      </ModalContainer>
    </Modal>
  );
}
