import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form``;

const InputContainer = styled.div``;

const Input = styled.input``;

const Submit = styled.button``;

function PasswordResetForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </InputContainer>
        <InputContainer>
          <Submit type="submit">Send Password Reset Email</Submit>
        </InputContainer>
      </Form>
    </Container>
  );
}

export default PasswordResetForm;
