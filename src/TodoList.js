import React from "react";
import styled from "styled-components";

import { Todo } from "./Todo";

export const TodoList = ({ nestedLevel, todos }) => {
  return (
    <>
      {todos.list.map((todo) => (
        <Todo key={todo.id} todo={todo} nestedLevel={nestedLevel} />
      ))}
      {todos.completed.map((todo) => (
        <Todo key={todo.id} todo={todo} nestedLevel={nestedLevel} />
      ))}
    </>
  );
};
