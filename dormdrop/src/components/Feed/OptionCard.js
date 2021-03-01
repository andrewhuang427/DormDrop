import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";
import OrderModal from "./OrderModal";
import { integerToTime } from "../../utils/index";

const Card = styled.div`
  cursor: pointer;
  width: auto;
  height: auto;
  padding: 15px;
  overflow: hidden;
  &:hover {
    background-color: #00000010;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const OverlayText = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-weight: 600;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const RestaurantDetailsContainer = styled.div`
  flex-grow: 1;
`;

const TitleContainer = styled.div``;

const Price = styled.div`
  display: inline-block;
  color: #3ab44b;
  margin: 5px auto;
  font-weight: 600;
`;

const NameContainer = styled.h3`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 5px;
  font-size: 15px;
`;

const Hours = styled.div`
  font-weight: 600;
  margin: 5px auto;
  font-size: 13px;
`;

const MaxOrder = styled.div`
  margin: 5px auto;
  font-weight: 500;
  font-size: 13px;
`;

const availableTimesToString = (times) => {
  let string = "";
  for (let i = 0; i < times.length; ++i) {
    const { open, close } = times[i];
    string += integerToTime(open) + "-" + integerToTime(close);
    if (i !== times.length - 1) {
      string += ", ";
    }
  }
  return string;
};

function OptionCard({ Details, addToCart, active }) {
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
              {!active ? (
                <Overlay>
                  <OverlayText>
                    Available Later
                    <Hours style={{ color: "white" }}>
                      Hours: {availableTimesToString(Details.data.timeSlots)}
                    </Hours>
                  </OverlayText>
                </Overlay>
              ) : (
                ""
              )}
            </ImageContainer>
            <CardBottom>
              <RestaurantDetailsContainer>
                <Box textOverflow="ellipsis">
                  <TitleContainer>
                    <NameContainer>{Details.data.displayName}</NameContainer>
                  </TitleContainer>
                </Box>
                <Price>
                  $ {Number(Details.data.price).toFixed(2) + " Delivery"}
                </Price>
                <MaxOrder>
                  Order by yourself or with you friends and stack up to{" "}
                  {Details.data.maxOrders} orders at the same fee.
                </MaxOrder>
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
        active={active}
      />
    </>
  );
}

export default OptionCard;
