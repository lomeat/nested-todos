import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "./TodoTree";
import { todosMock, newTodoMock } from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || todosMock
  );
  const [newTodo, setNewTodo] = useState(newTodoMock);

  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodo((state) => ({ ...state, title: value }));
  };

  // It is a recursive function that, by calling itself, iterates over all the data,
  // changes the selected item, and returns the entire new list.
  //
  // Function arguments:
  // - prevTodos: initial state
  // - id: id of element to be updated in state
  // - action: name of needable action with element
  // - temp?: temporary data for comparsion and iteration over the initial state
  // - nextTodos?: finished list of changed todos
  const updateTodos = (prevTodos, id, action, temp = {}, nextTodos = {}) => {
    if (id === null) {
      switch (action) {
        case "add-global":
          nextTodos = {
            children: [...prevTodos.children, { ...newTodo, id: newTodo.id() }],
          };
          break;
        case "remove-all":
          nextTodos = { children: [] };
          break;
      }
    } else {
      for (let a in prevTodos) {
        if (a === "children") {
          temp[a] = prevTodos[a];
          for (let b in prevTodos[a]) {
            const element = prevTodos[a][b];
            const toggledCompletedElement = {
              ...element,
              isComplete: !element.isComplete,
            };
            const toggledChildrenElement = {
              ...element,
              isShowChildren: !element.isShowChildren,
            };

            if (element.id === id) {
              switch (action) {
                case "toggle-complete":
                  temp[a][b] = toggledCompletedElement;
                  break;
                case "toggle-children":
                  temp[a][b] = toggledChildrenElement;
                  break;
                case "remove":
                  temp[a] = temp[a].filter((todo) => todo.id !== id);
                  break;
                case "add":
                  temp[a][b].children = [
                    ...temp[a][b].children,
                    { ...newTodo, id: newTodo.id() },
                  ];
                  break;
              }
            }

            if (temp[a].length) {
              updateTodos(prevTodos[a][b], id, action, temp[a][b], nextTodos);
            }
            nextTodos = { ...temp };
          }
        }
      }
    }

    setTodos(nextTodos);
    localStorage.setItem("todos", JSON.stringify(nextTodos));
  };

  const toggleIsTodoComplete = (todo) => {
    updateTodos(todos, todo.id, "toggle-complete");
  };

  const toggleIsTodoShowChildren = (todo) => {
    updateTodos(todos, todo.id, "toggle-children");
  };

  const addNewTodo = (todo, type = "add") => {
    if (todo !== null && !todo.isComplete) {
      updateTodos(todos, todo.id, type);
    } else {
      updateTodos(todos, null, type);
    }
  };

  const removeTodo = (todo) => {
    if (todo.isComplete) {
      updateTodos(todos, todo.id, "remove");
    }
  };

  const removeAllTodos = () => {
    updateTodos(todos, null, "remove-all");
  };

  const keyEnterPress = (e) => {
    if (e.key === "Enter" && newTodo.title.length) {
      addNewTodo(null, "add-global");
      setNewTodo((state) => ({ ...state, title: "" }));
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
            value={newTodo.title}
            onChange={changeNewTodoTitle}
            onKeyPress={keyEnterPress}
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
