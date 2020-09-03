import React from "react";

import { Todo } from "./Todo";

export const TodoTree = ({
  nestedLevel = 0,
  children,
  removeTodo,
  toggleIsTodoComplete,
  toggleIsTodoShowChildren,
  addNewTodo,
}) => (
  <>
    {children
      .filter((todo) => todo.isComplete === false)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={nestedLevel}
          toggleIsTodoComplete={toggleIsTodoComplete}
          toggleIsTodoShowChildren={toggleIsTodoShowChildren}
          addNewTodo={addNewTodo}
          removeTodo={removeTodo}
        />
      ))}
    {children
      .filter((todo) => todo.isComplete === true)
      .map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          nestedLevel={nestedLevel}
          toggleIsTodoComplete={toggleIsTodoComplete}
          toggleIsTodoShowChildren={toggleIsTodoShowChildren}
          addNewTodo={addNewTodo}
          removeTodo={removeTodo}
        />
      ))}
  </>
);
