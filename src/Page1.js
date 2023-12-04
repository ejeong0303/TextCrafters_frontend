import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Page1 = () => {
  return (
    <MainBox>
      <LogoContainer>
        <Logo src="logo512.png" alt="Logo" />
      </LogoContainer>
      <Text>Your Words, Your Way</Text>
      <Link to="/Page2">
        <ActionButton>로그인</ActionButton>
      </Link>
      <Text>
        <Link to="/Page3">
          <ActionButton>회원가입</ActionButton>
        </Link>
      </Text>
    </MainBox>
  );
};

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 390px;
  height: 844px;
  margin: 0 auto;
  background-color: white;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

const Text = styled.div`
  font-size: 13px;
  color: black;
  margin-top: 5px;
  font-family: verdana;
  font-style: italic;
  margin-bottom: 40px;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 120px;
  height: 30px;
  background-color: #D4E3CF;
  color: black;
  margin-top: 10px;
  cursor: pointer;
  font-size: 10px;
`;

export default Page1;
