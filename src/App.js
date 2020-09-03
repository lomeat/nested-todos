import React, { useState } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";
import todosMock from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);

  const updateTodos = (todos, id, action, temp = {}, newTodos = {}) => {
    for (let key in todos) {
      if (key === "children") {
        temp[key] = todos[key];
        for (let anotherKey in todos[key]) {
          const element = todos[key][anotherKey];
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
                temp[key][anotherKey] = toggledCompletedElement;
                break;
              case "toggle-children":
                temp[key][anotherKey] = toggledChildrenElement;
                break;
              case "remove":
                temp[key] = temp[key].filter((todo) => todo.id !== id);
                break;
              case "add":
                temp[key][anotherKey].children.push(newElement);
                break;
            }
          }

          updateTodos(
            todos[key][anotherKey],
            id,
            action,
            temp[key][anotherKey],
            newTodos
          );
          newTodos = { ...temp };
        }
      }
    }

    setTodos(newTodos);
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

  return (
    <Wrapper>
      <Container>
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
`;
