import React from "react";
import styled from "styled-components";

import { Todo } from "./Todo";

export const TodoList = ({ parent, todos, toggleIsComplete }) => {
  return (
    <Wrapper>
      {todos.list.map((todo) => (
        <Todo
          parent={parent}
          key={todo.id}
          todo={todo}
          toggleIsComplete={toggleIsComplete}
        />
      ))}
      {todos.completed.map((todo) => (
        <Todo
          parent={parent}
          key={todo.id}
          todo={todo}
          toggleIsComplete={toggleIsComplete}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 10px;
`;
