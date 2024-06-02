import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const url = "https://api.harvardartmuseums.org/image?";

const Image = styled.img`
  max-width: 68%;
  height: auto;
  object-fit: cover;
`;

function GalleryObject() {
  const [data, setData] = useState(null);
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
            console.log(response.data.records[0].baseimageurl);
            setData(response.data.records[0].baseimageurl);
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
      <h2>Id: {id}</h2>
      <Image src={data}></Image>
    </>
  );
}

export default GalleryObject;
