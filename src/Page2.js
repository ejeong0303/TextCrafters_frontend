import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


const Page2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = (event) => {
    // Determine which input field was changed and update the corresponding state
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleButtonClick = () => {
    axios
      .post("http://localhost:8000/api/login/", {
        email: email,
        password: password,
      })
      .then(function (response) {
        // Handle successful response
        console.log(response.data); // Log the response data to the console
      })
      .catch(function (error) {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <MainBox>
      <LogoContainer>
        <Logo src="logo512.png" alt="Logo" />
      </LogoContainer>
      <FormContainer>
      <InputBox
          type="text"
          name="email"
          placeholder="아이디를 입력하세요"
          value={email}
          onChange={handleInputChange}
        />
        <InputBox
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handleInputChange}
        />
        <Link to="/Page4"> {/* Use Link to navigate to Page4 */}
          <LoginButton onClick={handleButtonClick}>확인</LoginButton>
        </Link>
        <Text>
          계정이 없으신가요?{" "}
          <Link to="/Page3">
            <SignUpLink>회원가입</SignUpLink>
          </Link>
        </Text>
      </FormContainer>
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
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.input`
  width: 250px;
  height: 20px;
  border: none; 
  background-color: #f0f0f0; 
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 10px;
`;

const LoginButton = styled.button`
    border: none;
    border-radius: 10px;
    width: 120px; 
    height: 30px; 
    background-color: #D4E3CF; 
    color: black;
    margin-bottom: 10px;
    margin-top: 20px; 
    cursor: pointer;
    font-size: 10px;
`;

const Text = styled.div`
  font-size: 12px;
  color: black;
  margin-top: 20px;
`;

const SignUpLink = styled.a`
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;

export default Page2;
