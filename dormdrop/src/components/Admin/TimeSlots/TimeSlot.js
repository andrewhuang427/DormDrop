import React, { useState } from "react";
import styled from "styled-components";
import TimeSlotTable from "./TimeSlotTable";
import TimeSlotForm from "./TimeSlotForm";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const Wrapper = styled.div``;

const Container = styled.div``;

const SectionHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeadingContainer = styled.div``;

const Heading = styled.h3``;

const CreateEntryButtonContainer = styled.div`
  margin-top: 10px;
`;

const TableContainer = styled.div`
  margin-top: 30px;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    background: "none",
    color: "green",
    boxShadow: "none",
  },
}));

function TimeSlot() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <SectionHeadingContainer>
            <HeadingContainer>
              <Heading>Delivery Time Slots</Heading>
            </HeadingContainer>
            <CreateEntryButtonContainer>
              <Button
                onClick={toggleModal}
                className={classes.button}
                startIcon={<AddIcon />}
              >
                Add Time Slot
              </Button>
            </CreateEntryButtonContainer>
          </SectionHeadingContainer>
          <Divider />
          <TableContainer>
            <TimeSlotTable />
          </TableContainer>
        </Container>
      </Wrapper>
      <TimeSlotForm open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

export default TimeSlot;
