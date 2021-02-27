import React from "react";
import styled from "styled-components";

const CheckoutButtonContainer = styled.div``;

const FullWidthButton = styled.button`
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

function Cart({ cart, removeOrder }) {
  return (
    <div>
      {cart.map((order, index) => {
        return (
          <div>
            <div key={index}>{order.restaurant}</div>
            <CartItem order={order.orderDetails} removeOrder={removeOrder} />
          </div>
        );
      })}
      {cart.length > 0 ? (
        <CheckoutButtonContainer>
          <FullWidthButton>Checkout</FullWidthButton>
        </CheckoutButtonContainer>
      ) : (
        ""
      )}
    </div>
  );
}

export default Cart;

function CartItem({ order }) {
  return (
    <div>
      {order.map((singleOrder, index) => {
        return (
          <div key={index}>
            <div>{singleOrder.name}</div>
          </div>
        );
      })}
    </div>
  );
}
