import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { createGlobalStyle } from "styled-components";

import { App } from "./App";

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
    outline: none;
    box-sizing: border-box;
  }
`;

render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
