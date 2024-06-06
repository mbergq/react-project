import styled from "styled-components";

export const ColorButton = styled.button`
  width: 42px;
  height: 42px;
  border: solid 1px #00000080;
  border-radius: 32px;
`;

export const ColorDisplay = styled.div`
  width: 78px;
  height: 78px;
  border: 1px solid #00000080;
  border-radius: 42px;
  margin-bottom: 12px;
  background-color: ${(props) => props.$bgColor || "#ecebeb"};
`;

export const StyledCanvas = styled.canvas`
  height: 360px;
  width: 720px;
  border: 1px solid #000000;
`;

export const ColorBtnWrapper = styled.div`
  margin-left: 12px;
  max-width: 16%;
`;
