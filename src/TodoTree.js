import React from "react";

import { Todo } from "./Todo/";

export const TodoTree = (props) => (
  <>
    {props.children
      .filter((todo) => todo.isComplete === false)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={props.nestedLevel ? props.nestedLevel : 0}
          {...props}
        />
      ))}
    {props.children
      .filter((todo) => todo.isComplete === true)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={props.nestedLevel ? props.nestedLevel : 0}
          {...props}
        />
      ))}
  </>
);
