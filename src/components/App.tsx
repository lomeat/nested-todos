import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { Header } from "./Header";
import { TodoListBody } from "./TodoListBody";
import { theme, Theme } from "../theme";

export const App = () => {
  const storageTheme = JSON.parse(localStorage.getItem("theme") as string);
  const [currentTheme, setCurrentTheme] = React.useState(
    storageTheme || theme.light
  );

  const toggleTheme = (): void => {
    setCurrentTheme((state: React.SetStateAction<string | Theme>) => {
      const newState = state === theme.light ? theme.dark : theme.light;
      localStorage.setItem("theme", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Wrapper>
        <Container>
          <Header toggleTheme={toggleTheme} />
          <TodoListBody />
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  transition: 0.4s ease;

  @media (max-width: 500px) {
    align-items: flex-start;
  }
`;

const Container = styled.div`
  width: 600px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    width: 100%;
    justify-content: flex-start;
  }
`;
