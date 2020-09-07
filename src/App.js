import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { TodoTree } from "./TodoTree";
import { todosMock, newTodoMock } from "./mock";

export const App = () => {
  // Main data: all todos with structure (object-array-object-array...)
  const [todos, setTodos] = useState(todosMock);
  // Template for new added todo
  const [newTodo, setNewTodo] = useState(newTodoMock);

  // WD: Handles changes of new todo title
  // HW: Set new title value from input to todo template
  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodo((state) => ({ ...state, title: value }));
  };

  // WD: When interacting with the list, updates the old state
  // HW: It is a recursive function that, by calling itself, iterates over all the data,
  //     changes the selected item, and returns the entire new list.
  //
  //     Function arguments:
  //     - prevTodos: initial state
  //     - id: index of the item to be updated in state
  //     - action: name of needable reaction with element
  //     - temp?: temporary data for comparsion and iteration over the initial state
  //     - nextTodos?: finished list of changed todos
  //
  //     If id is null that means there are global functions that works with all top-level list
  //     Cycle iterate over every item and compare id with current id in cycle
  //     When id === element.id performs an action based on the type name
  //     If chosen element has children, run recursion for this list with new temp data
  //     At the end of recursion nextTodos get fully new updated list and set it to React state
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
  };

  // WD: Toggles the complete status of one todo
  // HW: Update state with changed element in old state
  const toggleIsTodoComplete = (todo) => {
    updateTodos(todos, todo.id, "toggle-complete");
  };

  // WD: Toggles the display of children for an element
  // HW: Update state with changed element in old state
  const toggleIsTodoShowChildren = (todo) => {
    updateTodos(todos, todo.id, "toggle-children");
  };

  // WD: Add new todo to exist element or to main list
  // HW: Update state with changed element in old state
  //     If clicked "add" on exist todo (type === "add"), add new todo to children of it
  //     else (type === "add-global") add new todo to top-level list
  const addNewTodo = (todo, type = "add") => {
    if (todo !== null && !todo.isComplete) {
      updateTodos(todos, todo.id, type);
    } else {
      updateTodos(todos, null, type);
    }
  };

  // WD: Remove one todo
  // HW: Update state with changed element in old state
  const removeTodo = (todo) => {
    if (todo.isComplete) {
      updateTodos(todos, todo.id, "remove");
    }
  };

  // WD: Remove all todos
  // HW: Update state with changed element in old state
  const removeAllTodos = () => {
    updateTodos(todos, null, "remove-all");
  };

  // WD: Create new todo with keyboard
  // HW: Check if pressed "Enter" when some typed in input
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
