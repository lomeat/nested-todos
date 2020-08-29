import React from "react";
import styled from "styled-components";

export const App = () => (
  <>
    <H1>Hello there</H1>
    <H1 red>This text is red</H1>
  </>
);

const H1 = styled.h1`
  color: ${(props) => (props.red ? "red" : "black")};
`;
