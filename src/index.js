import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { createGlobalStyle } from "styled-components";
import WebFont from "webfontloader";

import { App } from "./App";

WebFont.load({
  google: {
    families: ["Roboto:400,700", "Roboto Slab:400"],
  },
});

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
