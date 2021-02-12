import styled from "styled-components";

export const Title = styled.h1`
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.color};
`;

export const ToggleTheme = styled.button`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  font-family: "Roboto", sans-serif;
`;
