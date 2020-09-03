import React, { usetodo } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";

export const Todo = ({
  todo,
  nestedLevel,
  toggleIsTodoComplete,
  removeTodo,
  addNewTodo,
}) => {
  // Recursive count the level of nested lists...
  const newNestedLevel = nestedLevel + 1;
  // ...to make limit
  const nestedLimit = 3;

  return (
    <>
      <Wrapper key={todo.id}>
        <Title
          isComplete={todo.isComplete}
          onClick={() => toggleIsTodoComplete(todo)}
        >
          {todo.title}
        </Title>
        {todo.isComplete && (
          <Remove onClick={() => removeTodo(todo)}>Remove</Remove>
        )}
        {nestedLevel < nestedLimit && !todo.isComplete && (
          <Add onClick={() => addNewTodo(todo)}>Add</Add>
        )}
      </Wrapper>
      <ListLeftMargin>
        {todo.children && newNestedLevel <= nestedLimit && (
          <TodoTree
            nestedLevel={newNestedLevel}
            children={todo.children}
            removeTodo={removeTodo}
            addNewTodo={addNewTodo}
            toggleIsTodoComplete={toggleIsTodoComplete}
          />
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

const Remove = styled.button`
  :hover {
    cursor: pointer;
  }
`;

const ListLeftMargin = styled.div`
  margin-left: 20px;
`;
