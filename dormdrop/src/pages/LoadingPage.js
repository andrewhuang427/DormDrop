import React from "react";
import styled from "styled-components";
import ScaleLoader from "react-spinners/ScaleLoader";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  text-align: center;
  margin-top: 10px;
`;

function LoadingPage() {
  return (
    <Container>
      <ScaleLoader
        color={"#3ab44acc"}
        height={100}
        width={12}
        radius={20}
        margin={5}
      />
      <Text>Loading...</Text>
    </Container>
  );
}

export default LoadingPage;
