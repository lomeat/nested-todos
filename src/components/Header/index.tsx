import React from "react";
import * as SC from "./styles";

type Props = {
  toggleTheme: () => void;
};

export const Header: React.FC<Props> = ({ toggleTheme }) => {
  return (
    <>
      <SC.Title>Nested Todo App</SC.Title>
      <SC.ToggleTheme onClick={toggleTheme}>Toggle theme</SC.ToggleTheme>
    </>
  );
};
