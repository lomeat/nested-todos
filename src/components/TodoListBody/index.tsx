import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "../TodoTree";
import { addTodoToRoot, removeAllTodos } from "../../actions";
import * as SC from "./styles";

export const TodoListBody: any = () => {
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");
  const dispatch: Dispatch<TodoAction> = useDispatch();

  const todos: TodoState = useSelector((state: TodoReduxState) => state.todos);

  const addTodo: any = React.useCallback(
    (title: string) => dispatch(addTodoToRoot(title)),
    [dispatch]
  );

  const removeAll: any = React.useCallback(() => dispatch(removeAllTodos()), [
    dispatch,
  ]);

  const changeNewTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodoTitle(value);
  };

  const keyEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && newTodoTitle.length) {
      addTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  const clickAddTodoButton = () => {
    if (newTodoTitle.length) {
      addTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  return (
    <>
      <SC.EditListWrapper>
        <SC.Input
          type="text"
          placeholder="Ex.: Do a homework"
          value={newTodoTitle}
          onChange={changeNewTodoTitle}
          onKeyDown={keyEnterPress}
        />
        <SC.AddNewTodoButton onClick={clickAddTodoButton}>
          <IoMdAdd />
        </SC.AddNewTodoButton>
        <SC.RemoveAllButton onClick={removeAll}>
          <BiTrash />
        </SC.RemoveAllButton>
      </SC.EditListWrapper>
      <SC.TreeWrapper>
        <TodoTree children={todos.children} />
      </SC.TreeWrapper>
    </>
  );
};
