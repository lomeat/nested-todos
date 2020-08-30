import React from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";

export const Todo = ({ todo, nestedLevel, toggleIsComplete }) => {
  let newNestedLevel = nestedLevel + 1;

  return (
    <>
      <Wrapper key={todo.id} onClick={() => toggleIsComplete(todo)}>
        <Title isComplete={todo.isComplete}>{todo.title}</Title>
      </Wrapper>
      <ListLeftMargin>
        {(todo.children.list || todo.children.completed) &&
          newNestedLevel <= 3 && (
            <TodoTree nestedLevel={newNestedLevel} children={todo.children} />
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
