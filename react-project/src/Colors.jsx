import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import styled from "styled-components";
import axios from "axios";
const url = "https://api.harvardartmuseums.org/color?";

//Might change this 'div' name to toolboxwrapper when we add more "tools"
const ColorBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 224px;
  /* padding: 32px; */
  margin-bottom: 18px;
  /* gap: 2px; */
`;

const ColorBox = styled.button`
  width: 42px;
  height: 42px;
`;

function Colors() {
  const [colors, setColors] = useState(null);
  const [activeColor, setActiveColor] = useState("");

  const getColors = async () => {
    try {
      //fetch api-key from local json file
      const response = await fetch("../apikey.json");
      const json = await response.json();
      return axios
        .get(`${url}apikey=${json.apikey}&page=10`)
        .then((response) => {
          setColors(response.data.records);
          console.log("Fetch is done..");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <h2>Paint</h2>
      <ColorBoxWrapper>
        {colors !== null &&
          colors.map((color) => (
            <ColorBox
              key={color.id}
              style={{ backgroundColor: color.hex }}
              value={color.hex}
              onClick={(event) => setActiveColor(event.target.value)}
            ></ColorBox>
          ))}
      </ColorBoxWrapper>
      <Canvas props={{ activeColor: activeColor }} />
    </>
  );
}

export default Colors;
