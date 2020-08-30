import React from "react";
import styled from "styled-components";

import { Todo } from "./Todo";

export const TodoTree = ({ parent, nestedLevel, children }) => {
  return (
    <>
      {children.list.map((todo) => (
        <Todo
          key={todo.id}
          parent={parent}
          todo={todo}
          nestedLevel={nestedLevel}
        />
      ))}
      {children.completed.map((todo) => (
        <Todo
          key={todo.id}
          parent={parent}
          todo={todo}
          nestedLevel={nestedLevel}
        />
      ))}
    </>
  );
};
