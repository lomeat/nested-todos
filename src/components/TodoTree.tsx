import React from "react";

import { Todo, TodoType } from "./Todo";

export type TodoTreeType = TodoType[];

type TodoTreeProps = {
  children: TodoTreeType;
  nestedLevel?: number;
};

export const TodoTree = ({ children, nestedLevel }: TodoTreeProps) => (
  <>
    {children
      .filter((todo) => todo.isComplete === false)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={nestedLevel ? nestedLevel : 0}
        />
      ))}
    {children
      .filter((todo) => todo.isComplete === true)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={nestedLevel ? nestedLevel : 0}
        />
      ))}
  </>
);