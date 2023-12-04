import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faCheck } from "@fortawesome/free-solid-svg-icons";
import { MultiSelect } from "react-multi-select-component";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from './images/logo512.png';
import axios from "axios";

const SelectContainer = ({ label, id, setSelect, select }) => {
  const [isClicked, setisClicked] = useState(false);
  

  return (
    <>
      <SelectBox>{label}</SelectBox>
    </>
  );
};

const CenteredContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const fetchData = async () => {
  const restaurant = sessionStorage.getItem("restaurant");
  try {
    const response = await axios.post("http://localhost:8000/api/keywords/", {
      restaurant: restaurant,
    });

    const data = response.data;

    // 여기서 data를 사용하여 map 함수 실행
    const mappedData = data.map((categoryData, index) => (
      <div key={categoryData.category}>{/* ... JSX 코드 */}</div>
    ));

    // 여기서 mappedData를 사용할 수 있음
    console.log(mappedData);
  } catch (error) {
    // 오류가 발생한 경우 처리
    console.error("Error fetching data:", error);
  }
};

const Detail = () => {
 
  // useEffect(() => {
  //   const handleData = async () => {

      
  //   };

  //   handleData();
  // }, []);

  const restaurant = sessionStorage.getItem("restaurant");
  const [data, setDataArray] = useState([]);
  
  axios
    .post("http://localhost:8000/api/keywords/", {
      restaurant: restaurant,
    })
    .then((response) => {
      setDataArray(response.data);
     
      
    })
    .catch((error) => {
      // 오류가 발생한 경우 처리
      console.error("Error fetching data:", error);
    });

  const cate = ["가격", "서비스", "맛", "분위기"];
  const [selected, setSelected] = useState([]);

  const [select0, setSelect0] = useState([]);
  const [select1, setSelect1] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [select3, setSelect3] = useState([]);
  const [select4, setSelect4] = useState([]);

  const select = [select0, select1, select2, select3, select4];
  const setSelect = [
    setSelect0,
    setSelect1,
    setSelect2,
    setSelect3,
    setSelect4,
  ];


  const [word, setWord] = useState("");

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const navigate = useNavigate();
  const goNext =  async() => {
    const saveLabel = select.flatMap((labels) =>
      labels.map((item) => item.label)
    );

    console.log(saveLabel); //post하기
    console.log(word); //글자수
    sessionStorage.setItem("selectedKey", saveLabel)
    sessionStorage.setItem("word", word)
    
    navigate("/result");
    

    
  };

  return (
    <>
      <MainBox>
      <CenteredContainer>
        <img
          src={logo}
          style={{ width: "150px", marginTop: "120px", marginBottom:"50px" }}
        />
      </CenteredContainer>

        <BigTitles>
          키워드를 선택해
          <br />
          <SmallTitle>
            <SmallTitle1>나만의 리뷰</SmallTitle1>
            <SmallTitle2>를 생성해 보세요</SmallTitle2>
          </SmallTitle>
        </BigTitles>
        <BigBox>
          <LeftBox>
            <Title>
              <Icon>장소</Icon>
              <TitleText>
                <InputSearch>{restaurant}</InputSearch>
              </TitleText>
            </Title>

            {data.map((categoryData, index) => (
              <div key={categoryData.category}>
                <Title>
                  <Icon>{cate[index]}</Icon>
                  <TitleText>
                    <Input>
                      <MultiSelect
                        options={categoryData.keywords}
                        value={select[index]}
                        onChange={setSelect[index]}
                        labelledBy={"Select"}
                        isCreatable={true}
                      />
                    </Input>

                    <SmallBox>
                      <XSmaillBox>
                        {select[index].map((item) => (
                          <SelectContainer key={item.id} {...item} />
                        ))}
                      </XSmaillBox>
                    </SmallBox>
                  </TitleText>
                </Title>
              </div>
            ))}

            <Title>
              <Icon>글자수</Icon>
              <TitleText>
                <InputText
                  value={word}
                  onChange={handleInputChange}
                ></InputText>
                <Texts>자</Texts>
              </TitleText>
            </Title>
            <Next onClick={goNext}>결과 보기</Next>
          </LeftBox>
        </BigBox>
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  width: 390px;
  height: auto;
  margin: 0 auto;
  text-align: center;
`;

const StyledSelect = styled(MultiSelect)`
  height: 30px;
  width: 150px;
  &.multi-select {
    --rmsc-height: 35px !important; /* Height */
  }
`;

const ProgressBar = styled.div`
  width: 60%;
  height: 20px;
  background-color: #f5f5f5;
  border-radius: 20px;

  overflow: hidden;
  margin: 2% auto;
`;

const Progress = styled.div`
  width: ${(props) => props.width}%;
  height: 30px;
  padding: 0;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: #111;
`;

const BigTitles = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 5%;
  margin-top: 60px;
`;

const SmallTitle = styled.div`
  font-size: 1.3rem;
  text-align: center;
  justify-content: center;
  display: flex;
  margin-top: 10px;
  margin-bottom: 50px;
`;
const SmallTitle1 = styled.div`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
  color: #707e6c;
`;
const SmallTitle2 = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin-top: 5px;
`;

const BigBox = styled.div`
  width: 390px;

  margin: 0 auto;
  display: flex;
`;

const LeftBox = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Input = styled.div`
  background-color: #f6f5f5;
  height: 30px;
  border-radius: 60px;
`;

const InputSearch = styled.div`
  background-color: #f6f5f5;
  height: 30px;
  border-radius: 60px;
  margin-top: 5px;
  line-height: 2rem;
`;

const InputText = styled.input`
  background-color: #f6f5f5;
  height: 30px;
  width: 70px;
  border-radius: 60px;
  border: none;
  text-align: center;
  float: left;
  margin-top: 5px;
  &:focus {
    outline: none;
  }
`;

const Texts = styled.div`
  float: left;
  margin-top: 10px;
  margin-left: 5px;
`;

const Icon = styled.div`
  background-color: #dbeff0;
  height: 40px;
  width: 70px;
  font-size: 15px;
  border-radius: 60px;
  margin-right: 10px;
  line-height: 40px;
`;

const TitleText = styled.div`
  font-size: 15px;
  width: 220px;
`;

const SmallBox = styled.div`
  width: auto%;
  margin-top: 3%;
`;
const XSmaillBox = styled.div``;
const SelectBox = styled.button`
  height: 35px;
  font-size: 12px;
  margin: 15px 5px 0 5px;

  padding: 0 15px;

  border-radius: 60px;
  display: inline-block;
  text-align: center;
  float: left;

  background-color: #d3e4cf;
  border: none;

`;

const SelectBoxMenu = styled.button`
  height: 35px;
  font-size: 12px;
  margin: 15px 5px 0 5px;

  padding: 0 15px;
  border-radius: 60px;
  background-color: #d3e4cf;
  border: none;
  display: inline-block;
`;
const MenuDetail = styled.div`
  width: 100%;
`;
const Updown = styled.div`
  display: inline-block;
`;

const Next = styled.div`
  height: 35px;
  font-size: 12px;
  margin: 20px 160px;
  line-height: 2rem;

  padding: 0 15px;
  width: 70px;

  border-radius: 60px;
  display: inline-block;
  float: left;

  background-color: #d3e4cf;
  border: none;
`;
export default Detail;