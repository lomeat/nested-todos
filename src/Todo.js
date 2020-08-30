import React, { useState } from "react";
import styled from "styled-components";

import { TodoList } from "./TodoList";

export const Todo = ({ todo, nestedLevel }) => {
  const [state, setState] = useState(todo);
  let newNestedLevel = nestedLevel + 1;

  // Toggle complete state of one todo
  // if complete: move todo to up of line-throughed completed list
  // else: move todo to down of usual idle todo list
  const toggleIsComplete = () => {
    setState((state) => ({
      ...state,
      isComplete: !state.isComplete,
    }));
  };

  return (
    <>
      <Wrapper key={state.id} onClick={() => toggleIsComplete(state)}>
        <Title isComplete={state.isComplete}>{state.title}</Title>
      </Wrapper>
      <ListLeftMargin>
        {(state.todos.list || state.todos.completed) && newNestedLevel <= 3 && (
          <TodoList nestedLevel={newNestedLevel} todos={state.todos} />
        )}
      </ListLeftMargin>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: 0.1s ease;
  :hover {
    background: #eee;
  }
`;

const Title = styled.span`
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  font-size: 24px;
`;

const ListLeftMargin = styled.div`
  margin-left: 10px;
`;
