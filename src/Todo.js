import React, { useState } from "react";
import styled from "styled-components";

import { TodoTree } from "./TodoTree";

export const Todo = ({
  todo,
  nestedLevel,
  toggleIsTodoComplete,
  toggleIsTodoShowChildren,
  removeTodo,
  addNewTodo,
  setNewTodo,
  newTodo,
}) => {
  // Recursive count the level of nested lists...
  const newNestedLevel = nestedLevel + 1;
  // ...to make limit
  const nestedLimit = 3;

  const [isRemoveModalOpen, setIsRemoveModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(true);

  // WD: Toggles the display of remove modal
  // HW: Shows/hides the modal block
  //     If answered "yes" delete clicked element
  const toggleRemoveModalVisibility = (todo = null) => {
    setIsRemoveModal((state) => !state);
    if (todo) {
      removeTodo(todo);
    }
  };

  // WD: Toggles the display of remove modal
  // HW: Shows/hides the modal block
  //     If answered "yes" add new todo to clicked element
  const toggleAddModalVisibility = (todo = null) => {
    setIsAddModalOpen((state) => !state);
    if (todo) {
      addNewTodo(todo);
    }
  };

  // WD: Handles changes of new todo title
  // HW: Set new title value from input to todo template
  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodo((state) => ({ ...state, title: value }));
  };

  const keyEnterPress = (e) => {
    if (e.key === "Enter") {
      toggleAddModalVisibility(todo);
      setNewTodo((state) => ({ ...state, title: "" }));
    }
  };

  return (
    <>
      <Wrapper key={todo.id}>
        <Title
          isComplete={todo.isComplete}
          onClick={() => toggleIsTodoComplete(todo)}
        >
          {todo.title}
        </Title>
        <ButtonsWrapper>
          {nestedLevel < nestedLimit && todo.children.length > 0 && (
            <ToggleChildrenButton
              onClick={() => toggleIsTodoShowChildren(todo)}
            >
              {todo.isShowChildren ? "Hide" : "Show"}
            </ToggleChildrenButton>
          )}
          {todo.isComplete && (
            <RemoveButton onClick={toggleRemoveModalVisibility}>
              Remove
            </RemoveButton>
          )}
          {nestedLevel < nestedLimit && !todo.isComplete && (
            <AddButton onClick={toggleAddModalVisibility}>Add</AddButton>
          )}
        </ButtonsWrapper>
      </Wrapper>

      <ListLeftMargin>
        {todo.children &&
          newNestedLevel <= nestedLimit &&
          todo.isShowChildren && (
            <TodoTree
              nestedLevel={newNestedLevel}
              children={todo.children}
              removeTodo={removeTodo}
              addNewTodo={addNewTodo}
              toggleIsTodoComplete={toggleIsTodoComplete}
              toggleIsTodoShowChildren={toggleIsTodoShowChildren}
              setNewTodo={setNewTodo}
              newTodo={newTodo}
            />
          )}
      </ListLeftMargin>

      {isRemoveModalOpen && (
        <ModalOuter>
          <ModalInner>
            <ModalTitle>Are you sure?</ModalTitle>
            <ModalButtonsWrapper>
              <Button onClick={() => toggleRemoveModalVisibility(todo)}>
                yes
              </Button>
              <Button onClick={toggleRemoveModalVisibility}>no</Button>
            </ModalButtonsWrapper>
          </ModalInner>
        </ModalOuter>
      )}
      {isAddModalOpen && (
        <ModalOuter>
          <ModalInner>
            <ModalTitle>Do you want to add new todo?</ModalTitle>
            <ModalInput
              placeholder="Type your todo..."
              onChange={changeNewTodoTitle}
              value={newTodo.title}
              onKeyPress={keyEnterPress}
            />
            <ModalButtonsWrapper>
              <Button
                onClick={() => {
                  if (newTodo.title.length) {
                    toggleAddModalVisibility(todo);
                    setNewTodo((state) => ({ ...state, title: "" }));
                  }
                }}
              >
                yes
              </Button>
              <Button onClick={toggleAddModalVisibility}>no</Button>
            </ModalButtonsWrapper>
          </ModalInner>
        </ModalOuter>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 4px;
  transition: 0.1s ease;
  display: flex;
  justify-content: space-between;
  :hover {
    background: #eee;
  }
`;

const Title = styled.span`
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  font-size: 22px;
  padding: 0 10px;
  font-family: "Roboto Slab", serif;
  font-weight: 400;
`;

const ButtonsWrapper = styled.div``;

const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 1px solid #ccc;
  padding: 4px 10px;
  border-radius: 8px;
  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
  }
  :active {
    border-color: lightsteelblue;
  }
`;

const ToggleChildrenButton = styled(Button)``;

const AddButton = styled(Button)``;

const RemoveButton = styled(Button)``;

const ListLeftMargin = styled.div`
  margin-left: 20px;
`;

const ModalOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalInner = styled.div`
  z-index: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  font-family: "Roboto", sans;
  padding-bottom: 20px;
`;

const ModalInput = styled.input`
  font-family: "Roboto", sans-serif;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 4px 10px;
  :focus {
    border-color: lightsteelblue;
  }
`;

const ModalButtonsWrapper = styled.div`
  padding-top: 10px;
`;
