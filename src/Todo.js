import React, { usetodo } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";

export const Todo = ({
  todo,
  nestedLevel,
  toggleIsTodoComplete,
  toggleIsTodoShowChildren,
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
        <ButtonsWrapper>
          <Visibility onClick={() => toggleIsTodoShowChildren(todo)}>
            {todo.isShowChildren ? "Hide" : "Show"}
          </Visibility>
          {todo.isComplete && (
            <Remove onClick={() => removeTodo(todo)}>Remove</Remove>
          )}
          {nestedLevel < nestedLimit && !todo.isComplete && (
            <Add onClick={() => addNewTodo(todo)}>Add</Add>
          )}
        </ButtonsWrapper>
      </Wrapper>
      <ListLeftMargin>
        {todo.children &&
          newNestedLevel <= nestedLimit &&
          todo.isShowChildren && (
            <TodoTree
              nestedLevel={newNestedLevel}
              children={todo.children}
              removeTodo={removeTodo}
              addNewTodo={addNewTodo}
              toggleIsTodoComplete={toggleIsTodoComplete}
              toggleIsTodoShowChildren={toggleIsTodoShowChildren}
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
  box-sizing: border-box;
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
  padding: 0 10px;
`;

const ButtonsWrapper = styled.div``;

const Button = styled.button`
  margin-left: 10px;
  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
  }
`;

const Visibility = styled(Button)``;

const Add = styled(Button)``;

const Remove = styled(Button)``;

const ListLeftMargin = styled.div`
  margin-left: 20px;
`;
