import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "./TodoTree";
import { todosMock, newTodoMock } from "./mock";

export const App = () => {
  const [todos, setTodos] = useState(todosMock);
  const [newTodo, setNewTodo] = useState(newTodoMock);

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
                newTodos[a][b].children = [
                  ...newTodos[a][b].children,
                  { ...newTodo, id: newTodo.id() },
                ];
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
        children: [...todos.children, { ...newTodo, id: newTodo.id() }],
      };
    }

    setTodos(temp);
  };

  const toggleIsTodoComplete = (
    id,
    prevTodos = todos,
    temp = {},
    nextTodos = {}
  ) => {
    for (const a in prevTodos) {
      if (a === "children") {
        temp[a] = prevTodos[a];
        for (const b in prevTodos[a]) {
          const element = prevTodos[a][b];

          if (element.id === id) {
            temp[a][b] = {
              ...element,
              isComplete: !element.isComplete,
            };
          }

          if (temp[a].length) {
            toggleIsTodoComplete(id, prevTodos[a][b], temp[a][b], nextTodos);
          }
          nextTodos = { ...temp };
        }
      }
    }

    setTodos(nextTodos);
  };

  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodo((state) => ({ ...state, title: value }));
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
