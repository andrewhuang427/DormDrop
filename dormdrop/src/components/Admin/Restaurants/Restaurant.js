import React from "react";
import styled from "styled-components";
import RestaurantForm from "./RestaurantForm";
import RestaurantsTable from "./RestaurantTable";

const Wrapper = styled.div``;

const Container = styled.div``;

const SectionHeadingContainer = styled.div``;

const SectionHeading = styled.h3``;

const TableContainer = styled.div``;

function Restaurant() {
  return (
    <Wrapper>
      <Container>
        <SectionHeadingContainer>
          <SectionHeading>Available Restaurants</SectionHeading>
        </SectionHeadingContainer>
        <TableContainer>
          <RestaurantsTable />
        </TableContainer>
      </Container>
    </Wrapper>
  );
}

export default Restaurant;
