import styled from "styled-components";

export const ColorDisplay = styled.div`
  width: 44px;
  height: 44px;
  background-color: ${(props) => props.$bgColor || "#ecebeb"};
`;
