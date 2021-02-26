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

const NameContainer = styled.div`
  margin-top: 0;
  margin-bottom: 0;
`;

const Price = styled.div``;

const MaxOrder = styled.div``;

function OptionCard({ Details }) {
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
                <Price>$ {Number(Details.data.price).toFixed(2)}</Price>
                <MaxOrder>Stack up to {Details.data.maxOrders} orders</MaxOrder>
              </RestaurantDetailsContainer>
            </CardBottom>
          </>
        )}
      </Card>
      <OrderModal open={modalOpen} setOpen={setOpen} Details={Details} />
    </>
  );
}

export default OptionCard;
