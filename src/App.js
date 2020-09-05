import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "./TodoTree";
import { todosMock, newElement } from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodo, setNewTodo] = useState({
    id: () => Math.floor(Math.random() * Date.now()),
    title: newTodoTitle,
    isShowChildren: true,
    isComplete: false,
    children: [],
  });

  const updateTodos = (todos, id, action, newTodos = {}, temp = {}) => {
    for (let a in todos) {
      if (a === "children") {
        newTodos[a] = todos[a];
        for (let b in todos[a]) {
          const element = todos[a][b];
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
                newTodos[a][b] = toggledCompletedElement;
                break;
              case "toggle-children":
                newTodos[a][b] = toggledChildrenElement;
                break;
              case "remove":
                newTodos[a] = newTodos[a].filter((todo) => todo.id !== id);
                break;
              case "add":
                newTodos[a][b].children.push({
                  ...newTodo,
                  title: newTodoTitle,
                  id: newTodo.id(),
                });
                break;
            }
          } else {
            switch (action) {
              case "remove-all":
                newTodos = { children: [] };
                break;
            }
          }

          if (newTodos[a].length) {
            updateTodos(todos[a][b], id, action, newTodos[a][b], temp);
          }
          temp = { ...newTodos };
        }
      }
    }

    if (id === null && action === "add-global") {
      temp = {
        children: [
          ...todos.children,
          { ...newTodo, title: newTodoTitle, id: newTodo.id() },
        ],
      };
    }

    setTodos(temp);
  };

  const changeNewnewTodoTitle = (e) => {
    e.preventDefault();
    setNewTodoTitle(e.currentTarget.value);
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

  return (
    <Wrapper>
      <Container>
        <Title>Nested Todo App</Title>
        <EditListWrapper>
          <Input
            placeholder="Type your todo..."
            value={newTodoTitle}
            onChange={changeNewnewTodoTitle}
          />
          <AddNewTodoButton
            onClick={() => {
              if (newTodoTitle.length) {
                addNewTodo(null, "add-global");
                setNewTodoTitle("");
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
            setNewTodoTitle={setNewTodoTitle}
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
