import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "react-multi-select-component";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import FadeLoader from "react-spinners/FadeLoader";
import "./style.css";
import logo from './images/logo512.png';

const Loading = () => {
    return (
      <FadeLoader color="green" height={15} width={5} radius={2} margin={3}  />
    );
  };

  const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Result = () => {
 
  const [loading, setLoading] = useState(true);

  const [result, setDataArray] = useState([]);
  const num = sessionStorage.getItem("word");
  const goNext = async () => {
    const restaurantName = sessionStorage.getItem("restaurant");
    const keywords = sessionStorage.getItem("selectedKey");
    const charNum = sessionStorage.getItem("word");
    const dataToSend = {
      restaurant: restaurantName,
      keywords: keywords,
      char_num: charNum,
    };
console.log("try")
setLoading(true);


    try {
      const response = await fetch("http://localhost:8000/api/review/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      sessionStorage.setItem("result", responseData);
      setDataArray(responseData)
      setLoading(false);
      
    } catch (error) {
      console.error("Error while sending data:", error);
    }

    console.log("Data to send: ", dataToSend);
  };
  
  useEffect(() => {
    console.log("useEffect 실행 중");
    goNext();
  }, []);

  console.log(result)
  console.log(loading)

  const Text = () =>{
    return(
      <p>{result.review}</p>
    )
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.review);
      alert("Text copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };


  return (
    <>
      <CenteredContainer>
        <img
          src={logo}
          style={{ width: "150px", marginTop: "120px", marginBottom:"50px" }}
        />
      </CenteredContainer>
      <Title>생성된 문구</Title>
      <MainBox>
        <TextBox >글자 수: {num}</TextBox>

        <Button>
          <LongButton onClick={goNext}>다시 만들기</LongButton>
        </Button>
        <ResultBox>
        {loading ? <Loading /> : <Text/>}
        </ResultBox>
        <Copy onClick={copyToClipboard}>복사하기</Copy>
        
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  width: 390px;
  height: auto;
  margin: 0 auto;
`;
const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: #707e6c;
`;

const TextBox = styled.div`
  height: 35px;
  font-size: 12px;
  margin: 30px auto;
  width: 100px;
  font-size: 1rem;
  padding: 0 15px;
  border-radius: 60px;
  background-color: #f6f5f5;
  border: none;
  line-height: 2rem;
  text-align: center;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  
`;
const ShortButton = styled.div`
  height: 35px;
  font-size: 12px;
  margin: 10px 20px;
  width: 70px;
  padding: 0 15px;
  border-radius: 60px;
  background-color: #d3e4cf;
  border: none;
  font-size: 1rem;
  line-height: 2rem;
  display: inline-block;
`;
const LongButton = styled.div`
  height: 35px;
  font-size: 12px;
  margin: 10px 20px;
  width: 90px;
  padding: 0 15px;
  border-radius: 60px;
  background-color: #d3e4cf;
  border: none;
  font-size: 1rem;
  line-height: 2rem;
  display: inline-block;
`;
const ResultBox = styled.div`
  width: 300px;
  background-color: #dbeff0;
  height: auto;
  box-shadow: 5px 5px 5px #e1eded;
  padding: 30px;
  line-height: 2rem;
  margin: 20px auto;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;
const Copy = styled.div`
  height: 35px;
  font-size: 12px;
  margin: 30px auto;
  width: 100px;
  font-size: 1rem;
  padding: 0 15px;
  border-radius: 60px;
  background-color: #d3e4cf;
  border: none;
  line-height: 2rem;
  text-align: center;
`;

export default Result;