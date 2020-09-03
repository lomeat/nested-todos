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
            const element = todos[key][anotherKey];
            const toggledElement = {
              ...element,
              isComplete: !element.isComplete,
            };
            const newElement = {
              id: Math.random() * Date.now(),
              title: "New todo",
              isComplete: false,
              children: [],
            };

            if (element.id === id) {
              switch (action) {
                case "toggle":
                  temp[key][anotherKey] = toggledElement;
                  break;
                case "remove":
                  temp[key] = temp[key].filter((todo) => todo.id !== id);
                  break;
                case "add":
                  temp[key][anotherKey].children.push(newElement);
                  break;
              }
            }

            bruteforce(todos[key][anotherKey], temp[key][anotherKey], action);
            newTodos = { ...temp };
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

  const addNewTodo = (todo) => {
    updateTodos(todos, todo.id, "add");
  };

  const removeTodo = (todo) => {
    updateTodos(todos, todo.id, "remove");
  };

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
