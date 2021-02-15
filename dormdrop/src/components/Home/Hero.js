import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #fefefe;
`;

const Container = styled.div`
  max-width: 1200px;
  padding-top: 200px;
  padding-bottom: 200px;
  margin: auto;
  border: 0;
  display: flex;
  justify-content: center;
`;

const HeadingContainer = styled.div``;

const Heading = styled.h1`
  font-size: 40px;
`;

const SubHeading = styled.div`
  color: #8d8d8d;
  margin-bottom: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const OrderNow = styled.div`
  a {
    border-radius: 20px;
    border: none;
    background: #3ab44b;
    color: white;
    padding: 15px 30px;
    margin-right: 10px;
    text-decoration: none;
    :hover {
      cursor: pointer;
      background: #3ab44bcc;
    }
  }
`;

const RegisterNow = styled.div`
  a {
    border-radius: 20px;
    border: none;
    background: #3ab44b;
    color: white;
    padding: 15px 30px;
    margin-right: 10px;
    text-decoration: none;
    :hover {
      cursor: pointer;
      background: #3ab44bcc;
    }
  }
`;

export default function Hero() {
  return (
    <Wrapper>
      <Container>
        <HeadingContainer>
          {/* <DormDropLogo src={Logo} /> */}
          <Heading>
            Feeling Hungry? Get food delivered to your dorm room from anywhere
            on campus.
          </Heading>
          <SubHeading>
            Create an account with DormDrop and start placing orders right away.
            Stack up to 3 meals with a single order.
          </SubHeading>
          <ButtonContainer>
            <OrderNow>
              <Link to="/login">Sign In</Link>
            </OrderNow>
            <RegisterNow>
              <Link to="/register">Register</Link>
            </RegisterNow>
          </ButtonContainer>
        </HeadingContainer>
      </Container>
    </Wrapper>
  );
}
