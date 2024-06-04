import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import axios from "axios";
import { ColorButton } from "../styled-components/ColorButton.styled";
import { ColorDisplay } from "../styled-components/ColorDisplay.styled";
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
      <h2>Paint</h2>
      {colors !== null &&
        colors.map((color) => (
          <ColorButton
            key={color.id}
            style={{ backgroundColor: color.hex }}
            value={color.hex}
            onClick={(event) => setActiveColor(event.target.value)}
          ></ColorButton>
        ))}
      <ColorDisplay $bgColor={activeColor} />
      <Canvas props={{ activeColor: activeColor }} />
    </>
  );
}

export default Paint;
