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
  object-fit: cover;
  height: auto;
`;

export const ErrorMsg = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: red;
`;

export const StyledButton = styled.button`
  display: inline-block;
  color: grey;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid grey;
  &:hover {
    color: #34568b;
  }
  margin-top: 16px;
`;
