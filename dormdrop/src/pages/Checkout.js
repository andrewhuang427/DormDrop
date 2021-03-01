import React, { useState, useEffect } from "react";
import CheckoutNavbar from "../components/Checkout/CheckoutNavbar";
import OrderSummary from "../components/Checkout/OrderSummary";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Hero = styled.div`
  margin-top: 65px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #3ab44b;
  box-shadow: inset 0px -11px 8px -10px #888888;
`;

const HeadingContainer = styled.div`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

const CheckoutHeading = styled.h1`
  font-size: 40px;
  color: white;
`;

function Checkout() {
  const history = useHistory();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (
      window.localStorage.getItem("cart") === null ||
      JSON.parse(window.localStorage.getItem("cart")).length === 0
    ) {
      history.push("/feed");
    } else {
      setCart(JSON.parse(window.localStorage.getItem("cart")));
    }
  });

  return (
    <>
      <CheckoutNavbar />
      <Hero>
        <HeadingContainer>
          <CheckoutHeading>Checkout</CheckoutHeading>
        </HeadingContainer>
      </Hero>
      <OrderSummary cart={cart} />
    </>
  );
}

export default Checkout;
