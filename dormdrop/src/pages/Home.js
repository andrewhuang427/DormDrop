import React from "react";
import Navbar from "../components/Navigation/Navbar";
import Hero from "../components/Home/Hero";
import Directions from "../components/Home/Directions";
import Footer from "../components/Home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Directions />
      <Footer />
    </>
  );
}

export default Home;
