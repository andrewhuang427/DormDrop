import React, { useState } from "react";
import styled from "styled-components";
import { signInWithGoogle } from "../../firebase/firebase";
import Logo from "../../images/logo.png";
import GoogleLogo from "../../images/google.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
`;

const Content = styled.div`
  width: 100%;
`;

const FormContainer = styled.div``;

const Form = styled.form``;

const LogoContainer = styled.div`
  margin-left: -20px;
`;

const Header = styled.h3`
  margin: 10px auto 20px;
`;

const Image = styled.img`
  height: 60px;
  object-fit: contain;
`;

const InputContainer = styled.div`
  margin: 10px auto;
  width: 100%;
`;

const TextFieldLabel = styled.div`
  margin-bottom: 10px;
  font-size: 13px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding-left: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border-radius: 20px;
  width: 100%;
  border: none;
  display: flex;
  background: #3ab44b;
  color: white;
  padding: 15px 30px;
  margin-right: 10px;
  text-decoration: none;
  :hover {
    cursor: pointer;
    background: #3ab44bcc;
  }
`;

const GoogleButton = styled.button`
  cursor: pointer;
  border-radius: 20px;
  height: 50px;
  width: 100%;
  display: flex;
  background: white;
  outline: none;
  padding: 10px 20px;
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  :hover {
    background: #f8f8f8;
  }
`;

const GoogleLogoContainer = styled.div`
  height: 100%;
  img {
    height: 100%;
    object-fit: contain;
  }
`;

const Text = styled.div`
  margin-left: 20px;
  margin-top: 7px;
`;

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
    }
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <Image src={Logo} />
        </LogoContainer>
        <Header>Sign-Up</Header>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <TextFieldLabel>Email Address</TextFieldLabel>
              <Input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextFieldLabel>Password</TextFieldLabel>
              <Input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextFieldLabel>Confirm Password</TextFieldLabel>
              <Input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </InputContainer>
            <InputContainer>
              <ButtonContainer>
                <Button type="submit">Sign-In</Button>
              </ButtonContainer>
            </InputContainer>
          </Form>
        </FormContainer>
        <ButtonContainer>
          <GoogleButton onClick={signInWithGoogle}>
            <GoogleLogoContainer>
              <img src={GoogleLogo} />
            </GoogleLogoContainer>
            <Text>Sign-In With Google</Text>
          </GoogleButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default SignInForm;
