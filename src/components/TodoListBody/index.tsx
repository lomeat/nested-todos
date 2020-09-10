import React, { useState } from "react";
import { connect } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree, TodoTreeType } from "../TodoTree";
import * as SC from "./styles";

type TodoListBodyProps = {
  todos: {
    children: TodoTreeType;
  };
  addTodo: (title: string) => string;
  removeAllTodos: () => {};
};

export const TodoListBodyComponent: any = ({
  todos,
  addTodo,
  removeAllTodos,
}: TodoListBodyProps) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");

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
        <SC.RemoveAllButton onClick={removeAllTodos}>
          <BiTrash />
        </SC.RemoveAllButton>
      </SC.EditListWrapper>
      <SC.TreeWrapper>
        <TodoTree children={todos.children} />
      </SC.TreeWrapper>
    </>
  );
};

type TodoState = {
  todos: TodoTreeType;
};

const mapState = (state: TodoState) => ({
  todos: state.todos,
});

type TodoAction =
  | { type: "TODO_ADD_TO_ROOT"; title: string }
  | { type: "ALL_TODOS_REMOVE" };

const mapDispatch = (dispatch: React.Dispatch<TodoAction>) => ({
  addTodo: (title: string) => dispatch({ type: "TODO_ADD_TO_ROOT", title }),
  removeAllTodos: () => dispatch({ type: "ALL_TODOS_REMOVE" }),
});

export const TodoListBody = connect(
  mapState,
  mapDispatch
)(TodoListBodyComponent);
