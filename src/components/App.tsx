import React from "react";
import styled from "styled-components";

import { Header } from "./Header";
import { TodoListBody } from "./TodoListBody";

export const App = () => (
  <Wrapper>
    <Container>
      <Header />
      <TodoListBody />
    </Container>
  </Wrapper>
);

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
`;

export const Container = styled.div`
  width: 600px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
