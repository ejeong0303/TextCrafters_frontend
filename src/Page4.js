//import React from "react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const restaurantNames = [
  '현명식탁',
  '쟁반집8292 신촌점',
  '가야가야',
  '르바게트 메종',
  '서교주담 신촌',
  '마포옥',
  '세끼김밥',
  '동해횟집',
  '아건',
  '복성각',
  '과자방',
  '원조 조박집 본관',
  '라플로레종',
  '조용한저녁',
  '요수정',
  '메이비 케이크 홍대본점',
  '썸이프',
  '도토리앤다람쥐',
  '마녀주방 신촌점',
  '리가든 마포직영점',
  '마더린러 베이글',
  '고도식 마포점',
  '마루심 마포점',
  '대전해장국',
  '감자아일랜드 노우즈신촌',
  '퐁타이',
  '그동네떡볶이 홍대본점',
  '서산꽃게',
  '모연 마포본점',
  '이석덕생면파스타',
];

const Page4 = () => {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const [restaurant, setRestaurant] = useState(""); // State to store the restaurant name

  useEffect(() => {
    const storedRestaurant = sessionStorage.getItem("restaurant");
    if (storedRestaurant) {
      setRestaurant(storedRestaurant);
    }
  }, []);

  const handleInputChange = () => {
    setShowRestaurantList(!showRestaurantList);
    //sessionStorage.setItem("restaurant", newRestaurant); // Update session storage
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowRestaurantList(false);
  };

  const handleButtonClick = () => {
    if (selectedRestaurant) {
    axios
    .post("http://localhost:8000/api/keywords/", {
        restaurant: selectedRestaurant,
      })
      .then(function (response) {
        sessionStorage.setItem("restaurant", selectedRestaurant);
        console.log(response.data); 
        navigate('/select');
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
    }
  };    

  return (
    <MainBox>
      <LogoContainer>
        <Logo src="logo512.png" alt="Logo" />
      </LogoContainer>
      <FormContainer>
        <InputLabel>가게 이름을 선택하세요</InputLabel>
        <DropdownContainer>
          <InputBox
            type="text"
            placeholder="가게 이름을 입력하세요"
            onClick={handleInputChange}
            value={selectedRestaurant}
          />
          {showRestaurantList && (
            <RestaurantDropdown>
              {restaurantNames.map((name) => (
                <DropdownItem key={name} onClick={() => handleRestaurantClick(name)}>
                  {name}
                </DropdownItem>
              ))}
            </RestaurantDropdown>
          )}
        </DropdownContainer>
        <OkButton onClick={handleButtonClick}>확인</OkButton>
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
  width: 250px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const InputLabel = styled.div`
  font-size: 12px;
  color: black;
  margin-bottom: 5px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const InputBox = styled.input`
  width: 250px;
  height: 20px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  cursor: pointer;
`;

const RestaurantDropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px; /* Set the maximum height for the dropdown */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1;
`;


const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const OkButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 120px;
  height: 30px;
  background-color: #d4e3cf;
  color: black;
  margin-top: 20px;
  cursor: pointer;
  font-size: 12px;
`;

export default Page4;