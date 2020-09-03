import React, { useState } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";
import todosMock from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);

  const updateTodos = (todos, id, action, newTodos = {}, temp = {}) => {
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
          const newElement = {
            id: Math.random() * Date.now(),
            title: "New todo",
            isComplete: false,
            isShowChildren: true,
            children: [],
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
          }
          // else {
          //   switch (action) {
          //     case "remove-all":
          //       newTodos = {};
          //       break;
          //   }
          // }

          if (action === "remove-all") newTodos = { children: [] };

          if (newTodos[a].length) {
            updateTodos(todos[a][b], id, action, newTodos[a][b], temp);
          }
          temp = { ...newTodos };
        }
      }
    }

    setTodos(temp);
  };

  const toggleIsTodoComplete = (todo) => {
    updateTodos(todos, todo.id, "toggle-complete");
  };

  const toggleIsTodoShowChildren = (todo) => {
    updateTodos(todos, todo.id, "toggle-children");
  };

  const addNewTodo = (todo) => {
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
        <RemoveAllButton onClick={removeAllTodos}>Remove All</RemoveAllButton>
        <TodoTree
          children={todos.children}
          addNewTodo={addNewTodo}
          toggleIsTodoComplete={toggleIsTodoComplete}
          toggleIsTodoShowChildren={toggleIsTodoShowChildren}
          removeTodo={removeTodo}
        />
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
  justify-content: center;
`;

const RemoveAllButton = styled.button``;
