import React from "react";

import { Todo } from "./Todo/";

export const TodoTree = ({ children, nestedLevel }) => (
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
