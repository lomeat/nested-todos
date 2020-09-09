import {
  TODO_ADD_TO_EXIST,
  TODO_ADD_TO_ROOT,
  TODO_COMPLETE,
  TODO_DELETE,
  TODO_SHOW_CHILDREN,
  ALL_TODOS_UPDATE,
  ALL_TODOS_REMOVE,
} from "../constants/actionTypes";
import { todosMock, newTodo } from "../mock";

const initState = todosMock;

// args: (state: prevTodos, action: {id, type}, temp: {}, nextTodos: {})
export const todos = (
  prevTodos = initState,
  action,
  temp = {},
  nextTodos = {}
) => {
  if (action.todo.id === null) {
    switch (action.type) {
      case TODO_ADD_TO_ROOT:
        nextTodos = {
          children: [
            ...prevTodos.children,
            { ...newTodo, id: newTodo.id(), title: action.title },
          ],
        };
        break;
      case ALL_TODOS_REMOVE:
        nextTodos = { children: [] };
        break;
    }
  } else {
    for (let a in prevTodos) {
      if (a === "children") {
        temp[a] = prevTodos[a];
        for (let b in prevTodos[a]) {
          const element = prevTodos[a][b];
          const toggledCompletedElement = {
            ...element,
            isComplete: !element.isComplete,
          };
          const toggledChildrenElement = {
            ...element,
            isShowChildren: !element.isShowChildren,
          };

          if (element.id === action.todo.id) {
            switch (action.type) {
              case TODO_COMPLETE:
                temp[a][b] = toggledCompletedElement;
                break;
              case TODO_SHOW_CHILDREN:
                temp[a][b] = toggledChildrenElement;
                break;
              case TODO_REMOVE:
                temp[a] = temp[a].filter((todo) => todo.id !== action.todo.id);
                break;
              case TODO_ADD_TO_EXIST:
                temp[a][b].children = [
                  ...temp[a][b].children,
                  { ...newTodo, id: newTodo.id(), title: action.title },
                ];
                break;
            }
          }

          if (temp[a].length) {
            updateTodos(prevTodos[a][b], action, temp[a][b], nextTodos);
          }
          nextTodos = { ...temp };
        }
      }
    }
  }

  return nextTodos;
};
