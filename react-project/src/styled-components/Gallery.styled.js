import styled from "styled-components";

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
  max-width: 75%;
`;

export const StyledWrapperLeft = styled.div`
  margin-right: auto;
  max-width: 10%;
`;

export const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export const ErrorMsg = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: red;
`;
