import React, { useState } from "react";
import styled from "styled-components";

import { Todo } from "./Todo";

export const TodoTree = ({ nestedLevel = 0, children }) => {
  const [todos, setTodos] = useState(children);

  // Toggle complete state of one todo
  // if complete: move todo to up of line-throughed completed list
  // else: move todo to down of usual idle todo list
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

  const removeTodo = (todo) => {
    if (todo.isComplete) {
      setTodos((state) => ({
        ...state,
        completed: state.completed.filter((item) => item.id !== todo.id),
      }));
    }
  };

  const addNewTodo = (todo) => {
    const newTodo = {
      id: Math.floor(Math.random() * Date.now()),
      title: "New Todo",
      isComplete: false,
      children: {},
    };

    if (!todo.isComplete) {
      setTodos((state) => ({
        ...state,
        list: [
          ...state.list,
          {
            ...todo,
            children: {
              list: todo.children.list
                ? [...todo.children.list, newTodo]
                : [newTodo],
              completed: [],
            },
          },
        ],
      }));
    }
  };

  return (
    <>
      {todos.list.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={nestedLevel}
          toggleIsComplete={toggleIsTodoComplete}
          addNewTodo={addNewTodo}
        />
      ))}
      {todos.completed.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={nestedLevel}
          toggleIsComplete={toggleIsTodoComplete}
          removeTodo={removeTodo}
        />
      ))}
    </>
  );
};
