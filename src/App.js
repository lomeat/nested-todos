import React, { useState } from "react";
import styled from "styled-components";

import { TodoList } from "./TodoList";
import { todosMock } from "./mock";

export const App = () => {
  return (
    <Wrapper>
      <Container>
        <TodoList todos={todosMock} nestedLevel={0} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 700px;
  padding: 10px;
`;
