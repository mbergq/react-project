import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ColorBtnWrapper,
  ColorButton,
} from "../styled-components/Paint.styled";
import { StyledText } from "../styled-components/TextColor.styled";
import axios from "axios";

const url = "https://api.harvardartmuseums.org/image?";

const Image = styled.img`
  max-width: 70%;
  object-fit: cover;
  height: auto;
  margin-left: auto;
`;

function GalleryObject() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState(null);
  const [hexValue, setHexValue] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch api-key from local json file
        const response = await fetch("../apikey.json");
        const json = await response.json();
        return axios
          .get(`${url}apikey=${json.apikey}&id=${id}`)
          .then((response) => {
            // console.log(response.data.records[0].colors);
            // console.log(response.data.records[0]);
            setImage(response.data.records[0].baseimageurl);
            setColor(response.data.records[0].colors);
            console.log("Fetch is done..");
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      <ColorBtnWrapper>
        <StyledText>Value: {hexValue}</StyledText>
        {color !== null &&
          color.map((col, index) => (
            <ColorButton
              key={index}
              style={{ backgroundColor: col.color }}
              onClick={() => setHexValue(col.color)}
            ></ColorButton>
          ))}
      </ColorBtnWrapper>

      <Image src={image}></Image>
    </>
  );
}

export default GalleryObject;
