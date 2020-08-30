import React, { useState } from "react";
import styled from "styled-components";

import { TodoList } from "./TodoList";
import { todosMock } from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);

  // Toggle complete state of one todo
  // if complete: move todo to up of line-throughed completed list
  // else: move todo to down of usual idle todo list
  const toggleIsTodoComplete = (todo, parent) => {
    if (parent === null) {
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
    } else {
      // Сделать как перемещается знаю parent и todo отмеченные элемент внутри вложенности через list и completd используя стейт или фор
      if (todo.isComplete) {
        setTodos((state) => ({
          list: [
            ...state.list,
            {
              ...parent,
              todos: [...parent.todos.list, { ...todo, isComplete: false }],
            },
          ],
          completed: [
            ...state.completed,
            {
              ...parent,
              todos: [
                ...parent.todos.completed.filter((item) => item.id !== todo.id),
              ],
            },
          ],
        }));
      } else {
        setTodos((state) => ({
          list: [
            ...state.list,
            {
              ...parent,
              todos: [
                ...parent.todos.list.filter((item) => item.id !== todo.id),
              ],
            },
          ],
          completed: [
            ...state.completed,
            {
              ...parent,
              todos: [...parent.todos.completed, { ...todo, isComplete: true }],
            },
          ],
        }));
      }
    }
  };

  console.log(todos);

  return (
    <Wrapper>
      <Container>
        <TodoList
          parent={null}
          todos={todos}
          toggleIsComplete={toggleIsTodoComplete}
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
