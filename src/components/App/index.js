import React, { useState } from "react";
import { connect } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "../TodoTree";
import * as SC from "./styles";

export const AppComponent = ({ todos, addTodo, removeAllTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodoTitle(value);
  };

  const keyEnterPress = (e) => {
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
    <SC.Wrapper>
      <SC.Container>
        <SC.Title>Nested Todo App</SC.Title>
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
      </SC.Container>
    </SC.Wrapper>
  );
};

const mapState = (state) => ({
  todos: state.todos,
});

const mapDispatch = (dispatch) => ({
  addTodo: (title) => dispatch({ type: "TODO_ADD_TO_ROOT", title }),
  removeAllTodos: () => dispatch({ type: "ALL_TODOS_REMOVE" }),
});

export const App = connect(mapState, mapDispatch)(AppComponent);
