import React, { useState, useEffect } from "react";
import FeedNavbar from "../components/Feed/FeedNavbar";
import Feed from "../components/Feed/Feed";
import Footer from "../components/Home/Footer";
import styled from "styled-components";

const Hero = styled.div`
  margin-top: 65px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #3ab44b;
`;

const HeadingContainer = styled.div`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

const OrderNow = styled.h1`
  font-size: 50px;
  color: white;
`;

function UserFeed() {
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

  const addToCart = (order) => {
    const newCart = [...cart, order];
    console.log(newCart);
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    let copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <FeedNavbar removeFromCart={removeFromCart} cart={cart} />
      <Hero>
        <HeadingContainer>
          <OrderNow>Welcome, order now!</OrderNow>
        </HeadingContainer>
      </Hero>
      <Feed addToCart={addToCart} />
      <Footer />
    </>
  );
}

export default UserFeed;
