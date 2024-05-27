import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const url = 'https://api.harvardartmuseums.org/color?';

const ColorBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  flex-wrap: wrap;
  gap: 2px;
`;

const ColorBox = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 18px;
`;

function Colors() {
  const [colors, setColors] = useState(null);

  const getColors = async () => {
    try {
      //fetch api-key from local json file
      const response = await fetch('../apikey.json');
      const json = await response.json();
      //fetch the array of data needed and put it into state
      return axios
        .get(`${url}apikey=${json.apikey}&page=10`)
        .then((response) => {
          setColors(response.data.records);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <ColorBoxWrapper>
      {colors !== null &&
        colors.map((color) => (
          <ColorBox
            key={color.id}
            style={{ backgroundColor: color.hex }}
            value={color.hex}
            onClick={(e) => console.log(e.target.value)}
          ></ColorBox>
        ))}
    </ColorBoxWrapper>
  );
}

export default Colors;
