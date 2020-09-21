export const TODO_ADD_TO_EXIST = "TODO_ADD_TO_EXIST";
export const TODO_ADD_TO_ROOT = "TODO_ADD_TO_ROOT";
export const TODO_REMOVE = "TODO_REMOVE";
export const TODO_TOGGLE_COMPLETE = "TODO_TOGGLE_COMPLETE";
export const TODO_TOGGLE_SHOW_CHILDREN = "TODO_TOGGLE_SHOW_CHILDREN";
export const ALL_TODOS_REMOVE = "ALL_TODOS_REMOVE";

interface addTodoToExistAction {
  type: typeof TODO_ADD_TO_EXIST;
  id: TodoId;
  title: TodoTitle;
}

interface addTodoToRootAction {
  type: typeof TODO_ADD_TO_ROOT;
  title: TodoTitle;
}

interface toggleIsTodoCompleteAction {
  type: typeof TODO_TOGGLE_COMPLETE;
  id: TodoId;
}

interface toggleIsShowChildrenAction {
  type: typeof TODO_TOGGLE_SHOW_CHILDREN;
  id: TodoId;
}

interface removeTodoAction {
  type: typeof TODO_REMOVE;
  id: TodoId;
}

interface removeAllTodosAction {
  type: typeof ALL_TODOS_REMOVE;
}

export type TodoActionTypes =
  | addTodoToExistAction
  | addTodoToRootAction
  | toggleIsShowChildrenAction
  | toggleIsTodoCompleteAction
  | removeAllTodosAction
  | removeTodoAction;
