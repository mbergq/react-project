import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import axios from "axios";
import {
  ColorBtnWrapper,
  ColorButton,
  ColorDisplay,
} from "../styled-components/Paint.styled";
import {
  StyledText,
  StyledHeader,
} from "../styled-components/TextColor.styled";
const url = "https://api.harvardartmuseums.org/color?";

function Paint() {
  const [colors, setColors] = useState(null);
  const [activeColor, setActiveColor] = useState("");

  const getColors = async () => {
    try {
      //fetch api-key from local json file
      const response = await fetch("../apikey.json");
      const json = await response.json();
      return axios
        .get(`${url}apikey=${json.apikey}&page=9`)
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
      <StyledHeader $mt="0px">Paint</StyledHeader>
      <ColorBtnWrapper>
        <ColorDisplay $bgColor={activeColor} />
        {colors !== null &&
          colors.map((color) => (
            <ColorButton
              key={color.id}
              style={{ backgroundColor: color.hex }}
              value={color.hex}
              onClick={(event) => setActiveColor(event.target.value)}
            ></ColorButton>
          ))}
      </ColorBtnWrapper>
      <Canvas props={{ activeColor: activeColor }} />
    </>
  );
}

export default Paint;
