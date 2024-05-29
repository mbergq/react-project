import { useState, useEffect } from "react";

import styled from "styled-components";
import axios from "axios";
const url = "https://api.harvardartmuseums.org/image?";

const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;
const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(0, 6vw);
  grid-gap: 15px;
`;
const Div = styled.div`
  max-width: 60%;
`;
function Test() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      //fetch api-key from local json file
      const response = await fetch("../apikey.json");
      const json = await response.json();
      //fetch the array of data needed and put it into state
      return axios
        .get(`${url}apikey=${json.apikey}&size=100&page=32`)
        .then((response) => {
          console.log(response.data.records);
          setData(response.data.records);
          console.log("Fetch is done..");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Test</h2>
      <Div>
        <ImageWrapper>
          {data !== null &&
            data.map((object) => (
              <Image key={object.id} src={object.baseimageurl}></Image>
            ))}
        </ImageWrapper>
      </Div>
    </>
  );
}

export default Test;
