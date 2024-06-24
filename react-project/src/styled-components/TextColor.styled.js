import styled from "styled-components";

export const StyledText = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: ${(props) => props.$fontStyle || "normal"};
  color: ${(props) => props.$colorOpac || "#ffffff"};
`;

export const StyledHeader = styled(StyledText)`
  font-size: x-large;
  margin-top: ${(props) => props.$mt || ""};
`;
