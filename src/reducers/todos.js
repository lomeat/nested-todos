import {
  TODO_ADD_TO_EXIST,
  TODO_ADD_TO_ROOT,
  TODO_REMOVE,
  TODO_TOGGLE_COMPLETE,
  TODO_TOGGLE_SHOW_CHILDREN,
  ALL_TODOS_REMOVE,
} from "../constants/actionTypes";
import { todosMock, newTodoMock } from "../mock";

const initState = todosMock;
const newTodo = newTodoMock;

// It is a recursive function that, by calling itself, iterates over all the data,
// changes the selected item, and returns the entire new list.
//
// Function arguments:
// - prevTodos: initial state
// - action: action object for dispatcher
// - temp?: temporary data for comparsion and iteration over the initial state
// - nextTodos?: finished list of changed todos
export const todos = (state = initState, action) => {
  const updateTodos = (prevTodos, action, temp = {}, nextTodos = {}) => {
    if (!action.id) {
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
        default:
          return null;
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

            if (element.id === action.id) {
              switch (action.type) {
                case TODO_TOGGLE_COMPLETE:
                  temp[a][b] = toggledCompletedElement;
                  break;
                case TODO_TOGGLE_SHOW_CHILDREN:
                  temp[a][b] = toggledChildrenElement;
                  break;
                case TODO_REMOVE:
                  temp[a] = temp[a].filter((todo) => todo.id !== action.id);
                  break;
                case TODO_ADD_TO_EXIST:
                  temp[a][b].children = [
                    ...temp[a][b].children,
                    { ...newTodo, id: newTodo.id(), title: action.title },
                  ];
                default:
                  return null;
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

  const newState = updateTodos(state, action);

  if (newState) {
    return newState;
  } else {
    return state;
  }
};
