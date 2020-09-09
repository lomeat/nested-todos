import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "./TodoTree";

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
    <Wrapper>
      <Container>
        <Title>Nested Todo App</Title>
        <EditListWrapper>
          <Input
            type="text"
            placeholder="Ex.: Do a homework"
            value={newTodoTitle}
            onChange={changeNewTodoTitle}
            onKeyDown={keyEnterPress}
          />
          <AddNewTodoButton onClick={clickAddTodoButton}>
            <IoMdAdd />
          </AddNewTodoButton>
          <RemoveAllButton onClick={removeAllTodos}>
            <BiTrash />
          </RemoveAllButton>
        </EditListWrapper>
        <TreeWrapper>
          <TodoTree children={todos.children} />
        </TreeWrapper>
      </Container>
    </Wrapper>
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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
`;

const Container = styled.div`
  width: 600px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Roboto", sans-serif;
`;

const EditListWrapper = styled.div`
  display: flex;
  padding: 80px 0 40px 0;
`;

const Input = styled.input`
  font-family: "Roboto", sans-serif;
  border: 0;
  border-bottom: 1px solid #eee;
  padding: 4px 10px;
  background: transparent;
  :focus {
    border-color: lightsteelblue;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 0;
  font-size: 22px;
  padding: 0;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  transition: 0.1s ease;

  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
    color: black;
    background: #ddd;
  }
`;

const AddNewTodoButton = styled(Button)``;

const RemoveAllButton = styled(Button)``;

const TreeWrapper = styled.div`
  width: 100%;
`;
