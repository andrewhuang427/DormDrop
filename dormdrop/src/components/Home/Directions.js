import React, { useEffect } from "react";
import styled from "styled-components";
import { ImUserPlus, ImSpoonKnife } from "react-icons/im";
import { HiShoppingCart } from "react-icons/hi";
import { BsClockFill } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";

const Wrapper = styled.div`
  background: #f5f5f5;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
`;

const HeadingContainer = styled.div`
  text-align: left;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Heading = styled.h3`
  color: #3ab44b;
`;

const Description = styled.div`
  max-width: 420px;
`;

const Grid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
`;

const Card = styled.div`
  grid-column: span 3;
  padding: 45px;
  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
`;

const CardIcon = styled.div`
  color: #3ab44b;
  font-size: 30px;
  margin-bottom: 5px;
`;

const CardHeader = styled.h3`
  margin: 0 0 10px 0;
`;

const CardDescription = styled.div`
  color: #8d8d8d;
`;

export default function HowItWorks() {
  useEffect(() => {
    Aos.init({
      duration: 600,
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <HeadingContainer>
          <Heading>How It Works</Heading>
          <Description>
            We will take care of everything after you place your order: from
            pick up, to delivery, to hand off.
          </Description>
        </HeadingContainer>
        <Grid>
          <Card data-aos="fade-down" data-aos-once="true">
            <CardIcon>
              <ImUserPlus />
            </CardIcon>
            <CardHeader>Register</CardHeader>
            <CardDescription>
              Sign up using your campus email address and add your delivery
              location.
            </CardDescription>
          </Card>
          <Card data-aos="fade-down" data-aos-delay="100" data-aos-once="true">
            <CardIcon>
              <HiShoppingCart />
            </CardIcon>
            <CardHeader>Place Order</CardHeader>
            <CardDescription>
              Place your order by filling out the order form. Make note of all
              the meals that you ordered in the form so we know which order to
              pick up.
            </CardDescription>
          </Card>
          <Card data-aos="fade-down" data-aos-delay="200" data-aos-once="true">
            <CardIcon>
              <BsClockFill />
            </CardIcon>
            <CardHeader>Deliver</CardHeader>
            <CardDescription>
              Wait for your order to be prepared. We will deliver it as soon as
              we receive a notification that it is done.
            </CardDescription>
          </Card>
          <Card data-aos="fade-down" data-aos-delay="300" data-aos-once="true">
            <CardIcon>
              <ImSpoonKnife />
            </CardIcon>
            <CardHeader>Accept</CardHeader>
            <CardDescription>
              After we pick up your order, we will deliver it directly to the
              location which you specify. Once the delivery is complete, you
              will receive a notification.
            </CardDescription>
          </Card>
        </Grid>
      </Container>
    </Wrapper>
  );
}
