import {
  TODO_ADD_TO_EXIST,
  TODO_ADD_TO_ROOT,
  TODO_TOGGLE_COMPLETE,
  TODO_TOGGLE_SHOW_CHILDREN,
  TODO_REMOVE,
  ALL_TODOS_REMOVE,
} from "../constants/actionTypes";

type TodoId = number;
type TodoTitle = string;

export const addTodoToExist = (id: TodoId, title: TodoTitle) => ({
  type: TODO_ADD_TO_EXIST,
  id,
  title,
});

export const addTodoToRoot = (title: TodoTitle) => ({
  type: TODO_ADD_TO_ROOT,
  title,
});

export const toggleIsTodoComplete = (id: TodoId) => ({
  type: TODO_TOGGLE_COMPLETE,
  id,
});

export const toggleIsTodoShowChildren = (id: TodoId) => ({
  type: TODO_TOGGLE_SHOW_CHILDREN,
  id,
});

export const removeTodo = (id: TodoId) => ({
  type: TODO_REMOVE,
  id,
});

export const removeAllTodos = () => ({
  type: ALL_TODOS_REMOVE,
});
