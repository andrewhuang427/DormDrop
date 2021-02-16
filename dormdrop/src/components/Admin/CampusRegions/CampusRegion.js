import React from "react";
import styled from "styled-components";
import CampusRegionTable from "./CampusRegionTable";

const Wrapper = styled.div``;

const Container = styled.div``;

const SectionHeadingContainer = styled.div``;

const SectionHeading = styled.h3``;

const TableContainer = styled.div``;

function CampusRegion() {
  return (
    <Wrapper>
      <Container>
        <SectionHeadingContainer>
          <SectionHeading>Campus Regions</SectionHeading>
        </SectionHeadingContainer>
        <TableContainer>
          <CampusRegionTable />
        </TableContainer>
      </Container>
    </Wrapper>
  );
}

export default CampusRegion;
