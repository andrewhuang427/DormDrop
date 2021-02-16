import React from "react";
import styled from "styled-components";
import DormTable from "./DormTable";

const Wrapper = styled.div``;

const Container = styled.div``;

const SectionHeadingContainer = styled.div``;

const SectionHeading = styled.h3``;

const TableContainer = styled.div``;

function Dorm() {
  return (
    <Wrapper>
      <Container>
        <SectionHeadingContainer>
          <SectionHeading>Campus Dorms</SectionHeading>
        </SectionHeadingContainer>
        <TableContainer>
          <DormTable />
        </TableContainer>
      </Container>
    </Wrapper>
  );
}

export default Dorm;
