import {
  TODO_ADD_TO_EXIST,
  TODO_ADD_TO_ROOT,
  TODO_TOGGLE_COMPLETE,
  TODO_TOGGLE_SHOW_CHILDREN,
  TODO_REMOVE,
  ALL_TODOS_REMOVE,
  TodoActionTypes,
} from "../constants/actionTypes";

export const addTodoToExist = (
  id: TodoId,
  title: TodoTitle
): TodoActionTypes => ({
  type: TODO_ADD_TO_EXIST,
  id,
  title,
});

export const addTodoToRoot = (title: TodoTitle): TodoActionTypes => ({
  type: TODO_ADD_TO_ROOT,
  title,
});

export const toggleIsTodoComplete = (id: TodoId): TodoActionTypes => ({
  type: TODO_TOGGLE_COMPLETE,
  id,
});

export const toggleIsTodoShowChildren = (id: TodoId): TodoActionTypes => ({
  type: TODO_TOGGLE_SHOW_CHILDREN,
  id,
});

export const removeTodo = (id: TodoId): TodoActionTypes => ({
  type: TODO_REMOVE,
  id,
});

export const removeAllTodos = (): TodoActionTypes => ({
  type: ALL_TODOS_REMOVE,
});
