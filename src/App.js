import React, { useState } from "react";
import styled from "styled-components";

import { Todo } from "./Todo";

export const App = () => {
  const [todos, setTodos] = useState({
    list: [
      {
        id: 1,
        title: "Do homework",
        isComplete: false,
        children: [],
      },
      {
        id: 2,
        title: "Buy milk",
        isComplete: false,
        children: [],
      },
      {
        id: 3,
        title: "Get an offer",
        isComplete: false,
        children: [],
      },
    ],
    completed: [],
  });

  // toggle complete state of one todo
  // and move to down of list if completed
  // or move to up of list if uncompleted
  const toggleIsTodoComplete = (todo) => {
    if (todo.isComplete) {
      setTodos((state) => ({
        list: [...state.list, { ...todo, isComplete: false }],
        completed: state.completed.filter((item) => item.id !== todo.id),
      }));
    } else {
      setTodos((state) => ({
        list: state.list.filter((item) => item.id !== todo.id),
        completed: [{ ...todo, isComplete: true }, ...state.completed],
      }));
    }
  };

  return (
    <Wrapper>
      <Container>
        {todos.list.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            toggleIsComplete={toggleIsTodoComplete}
          />
        ))}
        {todos.completed.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            toggleIsComplete={toggleIsTodoComplete}
          />
        ))}
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
