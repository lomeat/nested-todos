import React, { useState } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";

export const Todo = ({ todo, nestedLevel, toggleIsComplete }) => {
  const newNestedLevel = nestedLevel + 1;
  const [state, setState] = useState(todo);

  const addNewTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * Date.now()),
      title: "New Todo",
      isComplete: false,
      children: {},
    };

    if (!state.isComplete) {
      const prevList = state.children.list;
      setState((state) => ({
        ...state,
        children: {
          list: prevList ? [...state.children.list, newTodo] : [newTodo],
          completed: prevList ? [...state.children.completed] : [],
        },
      }));
    }
  };

  console.log(state);

  return (
    <>
      <Wrapper key={state.id}>
        <Title
          isComplete={state.isComplete}
          onClick={() => toggleIsComplete(state)}
        >
          {state.title}
        </Title>
        {nestedLevel < 3 && !state.isComplete && (
          <Add onClick={() => addNewTodo(state)}>Add</Add>
        )}
      </Wrapper>
      <ListLeftMargin>
        {(state.children.list || state.children.completed) &&
          newNestedLevel <= 3 && (
            <TodoTree nestedLevel={newNestedLevel} children={state.children} />
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
  display: flex;
  justify-content: space-between;
  :hover {
    background: #eee;
  }
`;

const Title = styled.span`
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  font-size: 24px;
`;

const Add = styled.button`
  :hover {
    cursor: pointer;
  }
`;

const ListLeftMargin = styled.div`
  margin-left: 20px;
`;
