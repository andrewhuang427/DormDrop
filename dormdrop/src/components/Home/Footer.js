import React from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import { FaMapPin } from "react-icons/fa";
import Divider from "@material-ui/core/Divider";
const Wrapper = styled.div`
  margin: 20px 0 0 0;
  padding: 20px;
  border: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 0;
  margin: 50px auto 100px;
`;

const Grid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  margin-bottom: 50px;
`;

const Column = styled.div`
  grid-column: span 3;
  padding: 5px;
`;

const ColumnHeader = styled.h4`
  margin-bottom: 0;
`;

const Image = styled.img`
  margin-top: -20px;
  height: 55px;
  width: auto;
  object-fit: contain;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  cursor: pointer;
  padding-top: 20px;
  :hover {
    color: grey;
  }
`;

const BottomContainer = styled.div`
  margin-top: 50px;
  display: flex;
`;

const Copyright = styled.h4`
  margin-right: 40px;
`;

const Terms = styled.h4`
  margin-right: 40px;
  cursor: pointer;
  :hover {
    color: grey;
  }
`;

const Privacy = styled.h4`
  cursor: pointer;
  :hover {
    color: grey;
  }
`;

export default function Hero() {
  return (
    <Wrapper>
      <Container>
        <Grid>
          <Column>
            <Image src={logo} />
          </Column>
          <Column>
            <ColumnHeader>DormDrop LLC</ColumnHeader>
            <List>
              <Item>About Our Team</Item>
              <Item>Gift Cards</Item>
              <Item>Promotions</Item>
            </List>
          </Column>
          <Column>
            <ColumnHeader>Contact Us</ColumnHeader>
            <List>
              <Item>(610) 357 1227</Item>
              <Item>andrewhuang@wustl.edu</Item>{" "}
              <Item>6515 Wydown Blvd, St. Louis, MO 63105</Item>
            </List>
          </Column>
          <Column>
            <ColumnHeader>Follow Us</ColumnHeader>
            <List>
              <Item>Instagram</Item>
              <Item>Facebook</Item>
              <Item>Twitter</Item>
            </List>
          </Column>
        </Grid>
        <Divider />
        <BottomContainer>
          <Copyright>© 2021 DormDrop LLC</Copyright>
          <Terms>Terms</Terms>
          <Privacy>Privacy</Privacy>
        </BottomContainer>
      </Container>
    </Wrapper>
  );
}
