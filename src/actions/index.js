import {
  TODO_ADD_TO_EXIST,
  TODO_ADD_TO_ROOT,
  TODO_TOGGLE_COMPLETE,
  TODO_TOGGLE_SHOW_CHILDREN,
  TODO_REMOVE,
  ALL_TODOS_REMOVE,
} from "../constants/actionTypes";

export const addTodoToExist = (id, title) => ({
  type: TODO_ADD_TO_EXIST,
  id,
  title,
});

export const addTodoToRoot = (title) => ({
  type: TODO_ADD_TO_ROOT,
  title,
});

export const toggleIsTodoComplete = (id) => ({
  type: TODO_TOGGLE_COMPLETE,
  id,
});

export const toggleIsTodoShowChildren = (id) => ({
  type: TODO_TOGGLE_SHOW_CHILDREN,
  id,
});

export const removeTodo = (id) => ({
  type: TODO_REMOVE,
  id,
});

export const removeAllTodos = () => ({
  type: ALL_TODOS_REMOVE,
});
