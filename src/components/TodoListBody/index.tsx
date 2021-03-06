import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "../TodoTree";
import { addTodoToRoot, removeAllTodos } from "../../store/actions";
import * as SC from "./styles";

export const TodoListBody: any = () => {
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");
  const dispatch: Dispatch<TodoAction> = useDispatch();

  const todos: TodoState = useSelector((state: TodoReduxState) => state.todos);

  const addTodo: any = (title: string) => dispatch(addTodoToRoot(title));
  const removeAll: any = () => dispatch(removeAllTodos());

  const changeNewTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodoTitle(value);
  };

  const handleKeyEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      checkTitleLength();
    }
  };

  const checkTitleLength = () => {
    if (newTodoTitle.length) {
      addTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  return (
    <>
      <SC.EditListWrapper onSubmit={checkTitleLength} onReset={removeAll}>
        <SC.Input
          type="text"
          placeholder="Ex.: Do a homework"
          value={newTodoTitle}
          onChange={changeNewTodoTitle}
          onKeyDown={handleKeyEnterDown}
          autoFocus
        />
        <SC.AddNewTodoButton type="submit">
          <IoMdAdd />
        </SC.AddNewTodoButton>
        <SC.RemoveAllButton type="reset">
          <BiTrash />
        </SC.RemoveAllButton>
      </SC.EditListWrapper>
      <SC.TreeWrapper>
        <TodoTree children={todos.children} />
      </SC.TreeWrapper>
    </>
  );
};
