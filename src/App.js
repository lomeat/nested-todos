import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "./TodoTree";
import { todosMock, newTodoMock, updateTodos } from "./utils";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);
  const [newTodo, setNewTodo] = useState(newTodoMock);

  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodo((state) => ({ ...state, title: value }));
  };

  const toggleIsTodoComplete = (todo) => {
    const newTodos = updateTodos(todos, todo.id, "toggle-complete");
    setTodos(newTodos);
  };

  const toggleIsTodoShowChildren = (todo) => {
    const newTodos = updateTodos(todos, todo.id, "toggle-children");
    setTodos(newTodos);
  };

  const addNewTodo = (todo, type = "add") => {
    if (todo !== null && !todo.isComplete) {
      const newTodos = updateTodos(todos, todo.id, type);
      setTodos(newTodos);
    } else {
      const newTodos = updateTodos(todos, null, type);
      setTodos(newTodos);
    }
  };

  const removeTodo = (todo) => {
    if (todo.isComplete) {
      const newTodos = updateTodos(todos, todo.id, "remove");
      setTodos(newTodos);
    }
  };

  const removeAllTodos = () => {
    const newTodos = updateTodos(todos, null, "remove-all");
    setTodos(newTodos);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Nested Todo App</Title>
        <EditListWrapper>
          <Input
            placeholder="Type your todo..."
            value={newTodo.title}
            onChange={changeNewTodoTitle}
          />
          <AddNewTodoButton
            onClick={() => {
              if (newTodo.title.length) {
                addNewTodo(null, "add-global");
                setNewTodo((state) => ({ ...state, title: "" }));
              }
            }}
          >
            <IoMdAdd />
          </AddNewTodoButton>
          <RemoveAllButton onClick={removeAllTodos}>
            <BiTrash />
          </RemoveAllButton>
        </EditListWrapper>
        <TreeWrapper>
          <TodoTree
            children={todos.children}
            addNewTodo={addNewTodo}
            toggleIsTodoComplete={toggleIsTodoComplete}
            toggleIsTodoShowChildren={toggleIsTodoShowChildren}
            removeTodo={removeTodo}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
          />
        </TreeWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 700px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1``;

const EditListWrapper = styled.div`
  display: flex;
  padding: 40px;
`;

const Input = styled.input``;

const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 0;
  font-size: 20px;
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
    background: #eee;
  }
`;

const AddNewTodoButton = styled(Button)``;

const RemoveAllButton = styled(Button)``;

const TreeWrapper = styled.div`
  width: 100%;
`;
