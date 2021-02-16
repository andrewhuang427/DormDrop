import React from "react";
import styled from "styled-components";
// import TimeSlotForm from "./TimeSlotForm";
import TimeSlotTable from "./TimeSlotTable";

const Wrapper = styled.div``;

const Container = styled.div``;

const SectionHeadingContainer = styled.div``;

const SectionHeading = styled.h3``;

const TableContainer = styled.div``;

function TimeSlot() {
  return (
    <Wrapper>
      <Container>
        <SectionHeadingContainer>
          <SectionHeading>Delivery Time Slots</SectionHeading>
        </SectionHeadingContainer>
        <TableContainer>
          <TimeSlotTable />
        </TableContainer>
      </Container>
    </Wrapper>
  );
}

export default TimeSlot;
