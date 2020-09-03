import React, { useState } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";
import todosMock from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);

  const updateTodos = (todos, id, action) => {
    let newTodos = {};
    const bruteforce = (todos, temp = {}, action) => {
      for (let key in todos) {
        if (key === "children") {
          temp[key] = todos[key];
          for (let anotherKey in todos[key]) {
            switch (action) {
              case "toggle": {
                const oldElement = todos[key][anotherKey];
                const newElement = {
                  ...oldElement,
                  isComplete: !oldElement.isComplete,
                };
                if (oldElement.id === id) {
                  temp[key][anotherKey] = newElement;
                } else {
                  temp[key][anotherKey] = oldElement;
                }
              }
            }

            if (!temp[key][anotherKey].children.length) {
              newTodos = { ...temp };
            }

            bruteforce(todos[key][anotherKey], temp[key][anotherKey], action);
          }
        }
      }
    };

    bruteforce(todos, newTodos, action);
    setTodos(newTodos);
  };

  const toggleIsTodoComplete = (todo) => {
    updateTodos(todos, todo.id, "toggle");
  };

  const addNewTodo = (todo) => {};

  const removeTodo = (id) => {};

  return (
    <Wrapper>
      <Container>
        <TodoTree
          children={todos.children}
          addNewTodo={addNewTodo}
          toggleIsTodoComplete={toggleIsTodoComplete}
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
