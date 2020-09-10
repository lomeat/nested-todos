import React from "react";
import { render } from "react-dom";
import "normalize.css";
import { createGlobalStyle } from "styled-components";
import WebFont from "webfontloader";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { App } from "./components/App";
import reducer from "./reducers";

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

const store = createStore(reducer);
console.log(store.getState());

render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById("root")
);
