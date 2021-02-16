import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DormDropLogo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { debounce } from "@material-ui/core";

const Nav = styled.div`
  height: 70px;
  width: 100%;
  background-color: #fefefe;
  position: fixed;
  top: ${(props) => (props.show ? 0 : "-80px")};
  left: 0;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
  display: block;
  transition: top 0.3s;
  z-index: 9999;
`;

const Container = styled.div`
  height: 100%;
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  height: 100%;
  flex-grow: 1;
`;

const Logo = styled.img`
  height: 80%;
  object-fit: contain;
`;

const Links = styled.div`
  display: flex;
  margin-top: 30px;
`;

const SignIn = styled.div`
  font-size: 12px;
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

const Register = styled.div`
  font-size: 12px;
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

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 40);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
  return (
    <Nav show={visible}>
      <Container>
        <LogoContainer>
          <Logo src={DormDropLogo} />
        </LogoContainer>
      </Container>
    </Nav>
  );
}

export default Navbar;
