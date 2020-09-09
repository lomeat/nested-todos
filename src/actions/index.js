import {
  TODO_ADD_TO_EXIST,
  TODO_ADD_TO_ROOT,
  TODO_COMPLETE,
  TODO_REMOVE,
  TODO_SHOW_CHILDREN,
  ALL_TODOS_REMOVE,
} from "../constants/actionTypes";

export const addTodoToExist = (todo) => ({
  type: TODO_ADD_TO_EXIST,
  todo,
  title,
});

export const addTodoToRoot = (todo) => ({
  type: TODO_ADD_TO_ROOT,
  todo,
  title,
});

export const toggleIsTodoComplete = (todo) => ({
  type: TODO_COMPLETE,
  todo,
});

export const toggleIsTodoShowChildren = (todo) => ({
  type: TODO_SHOW_CHILDREN,
  todo,
});

export const removeTodo = (todo) => ({
  type: TODO_REMOVE,
  todo,
});

export const removeAllTodos = () => ({
  type: ALL_TODOS_REMOVE,
});
