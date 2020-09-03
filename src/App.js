import React, { useState } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";
import todosMock from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);

  const updateTodos = (todos, id, action, newTodos = {}, temp = {}) => {
    const newElement = {
      id: Math.random() * Date.now(),
      title: "New todo",
      isComplete: false,
      isShowChildren: true,
      children: [],
    };

    for (let a in todos) {
      if (a === "children") {
        newTodos[a] = todos[a];
        for (let b in todos[a]) {
          const element = todos[a][b];
          const toggledCompletedElement = {
            ...element,
            isComplete: !element.isComplete,
          };
          const toggledChildrenElement = {
            ...element,
            isShowChildren: !element.isShowChildren,
          };

          if (element.id === id) {
            switch (action) {
              case "toggle-complete":
                newTodos[a][b] = toggledCompletedElement;
                break;
              case "toggle-children":
                newTodos[a][b] = toggledChildrenElement;
                break;
              case "remove":
                newTodos[a] = newTodos[a].filter((todo) => todo.id !== id);
                break;
              case "add":
                newTodos[a][b].children.push(newElement);
                break;
            }
          } else {
            switch (action) {
              case "remove-all":
                newTodos = { children: [] };
                break;
            }
          }

          if (newTodos[a].length) {
            updateTodos(todos[a][b], id, action, newTodos[a][b], temp);
          }
          temp = { ...newTodos };
        }
      }
    }

    if (!id && action === "add") {
      temp = { children: [...newTodos.children, { ...newElement }] };
    }

    setTodos(temp);
  };

  const toggleIsTodoComplete = (todo) => {
    updateTodos(todos, todo.id, "toggle-complete");
  };

  const toggleIsTodoShowChildren = (todo) => {
    updateTodos(todos, todo.id, "toggle-children");
  };

  const addNewTodo = (todo = null) => {
    updateTodos(todos, todo.id, "add");
  };

  const removeTodo = (todo) => {
    if (todo.isComplete) {
      updateTodos(todos, todo.id, "remove");
    }
  };

  const removeAllTodos = () => {
    updateTodos(todos, null, "remove-all");
  };

  return (
    <Wrapper>
      <Container>
        <ButtonsWrapper>
          <AddNewTodoButton onClick={addNewTodo}>Add New Todo</AddNewTodoButton>
          <RemoveAllButton onClick={removeAllTodos}>Remove All</RemoveAllButton>
        </ButtonsWrapper>
        <TreeWrapper>
          <TodoTree
            children={todos.children}
            addNewTodo={addNewTodo}
            toggleIsTodoComplete={toggleIsTodoComplete}
            toggleIsTodoShowChildren={toggleIsTodoShowChildren}
            removeTodo={removeTodo}
          />
        </TreeWrapper>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TreeWrapper = styled.div`
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  padding-bottom: 40px;
`;

const Button = styled.button`
  margin-left: 10px;
  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
  }
`;

const AddNewTodoButton = styled(Button)``;

const RemoveAllButton = styled(Button)``;
