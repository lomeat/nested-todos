import React, { useState } from "react";

import { Todo } from "./Todo";

export const TodoTree = ({ nestedLevel = 0, children }) => {
  const [todos, setTodos] = useState(children);

  // WD: Toggle complete state of one todo
  //     if click when completed: move todo to up of line-throughed completed list
  //     else: move todo to down of usual idle todo list
  // HW: When click on completed todo return new state with adding element to list[]
  //     and filtered completed[] without clicked todo
  //     When click on uncompleted todo return new state with filtered list[] without clicked todo
  //     and adding element to completed[]
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

  // WD: Remove exist todo from list
  // HW: If todo is complete return state with filtered completed[] without clicked todo
  const removeTodo = (todo) => {
    if (todo.isComplete) {
      setTodos((state) => ({
        ...state,
        completed: state.completed.filter((item) => item.id !== todo.id),
      }));
    }
  };

  // WD: Add new todo to exist todo
  // HW: If todo is uncompleted return previous state with
  //     and adding new template todo to inner tree of clicked todo
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
              // If todo.children object is empty, create new arrays to "list" and "completed" keys
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
