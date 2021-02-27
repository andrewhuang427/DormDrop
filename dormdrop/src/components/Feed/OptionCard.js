import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";
import OrderModal from "./OrderModal";

const Card = styled.div`
  cursor: pointer;
  width: auto;
  height: 100%;
  padding: 10px;
`;

const ImageContainer = styled.div`
  width: auto;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RestaurantDetailsContainer = styled.div`
  flex-grow: 1;
`;

const NameContainer = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`;

const Price = styled.div``;

const MaxOrder = styled.div`
  margin: 10px auto;
`;

function OptionCard({ Details, addToCart }) {
  const [modalOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });

  return (
    <>
      <Card
        onClick={() => {
          setOpen(!modalOpen);
        }}
      >
        {isLoading ? (
          <Box width={"100%"}>
            <Skeleton variant="rect" width={"100%"} height={200} />
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        ) : (
          <>
            <ImageContainer>
              <Image src={Details.data.imageURL} />
            </ImageContainer>
            <CardBottom>
              <RestaurantDetailsContainer>
                <NameContainer>{Details.data.displayName}</NameContainer>
                <MaxOrder>
                  Order by yourself or with friends and stack up to{" "}
                  {Details.data.maxOrders} orders
                </MaxOrder>
                <Price>$ {Number(Details.data.price).toFixed(2)}</Price>
              </RestaurantDetailsContainer>
            </CardBottom>
          </>
        )}
      </Card>
      <OrderModal
        open={modalOpen}
        setOpen={setOpen}
        Details={Details}
        addToCart={addToCart}
      />
    </>
  );
}

export default OptionCard;
