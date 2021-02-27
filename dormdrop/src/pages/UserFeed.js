import React, { useState } from "react";
import FeedNavbar from "../components/Feed/FeedNavbar";
import Feed from "../components/Feed/Feed";

function UserFeed() {
  const [cart, setCart] = useState([]);

  const addToCart = (order) => {
    const newCart = [...cart, order];
    console.log(newCart)
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    let copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
  };

  return (
    <>
      <FeedNavbar removeFromCart={removeFromCart} cart={cart} />
      <Feed addToCart={addToCart} />
    </>
  );
}

export default UserFeed;
