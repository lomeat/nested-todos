import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
    outline: none;
    box-sizing: border-box;
  }
`;

import { App } from "./App";

render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
