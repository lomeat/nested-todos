import React, { useState } from "react";
import styled from "styled-components";

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
  const handleClickTodoTitleButton = (todo) => {
    if (todo.isComplete) {
      setTodos((state) => ({
        list: [...state.list, { ...todo, isComplete: false }],
        completed: state.completed.filter((item) => item.id !== todo.id),
      }));
    } else {
      setTodos((state) => ({
        list: state.list.filter((item) => item.id !== todo.id),
        completed: [...state.completed, { ...todo, isComplete: true }],
      }));
    }
  };

  return (
    <Wrapper>
      <Container>
        {todos.list.map((todo) => (
          <div key={todo.id}>
            <Title onClick={() => handleClickTodoTitleButton(todo)}>
              {todo.title}
            </Title>
          </div>
        ))}
        {todos.completed.map((todo) => (
          <div key={todo.id}>
            <Title onClick={() => handleClickTodoTitleButton(todo)} isComplete>
              {todo.title}
            </Title>
          </div>
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

const Title = styled.h2`
  text-decoration: ${(props) => (props.isComplete ? "underline" : "none")};
  cursor: pointer;
  transition: 0.1s ease;
  padding: 4px;
  border-radius: 4px;
  :hover {
    background: #eee;
  }
`;
