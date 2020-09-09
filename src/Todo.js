import React, { useState } from "react";
import styled from "styled-components";
import { BiChevronLeft } from "react-icons/bi";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleRemoveModalVisibility = (todo = null) => {
    setIsRemoveModal((state) => !state);
    if (todo) {
      removeTodo(todo);
    }
  };

  const toggleAddModalVisibility = (todo = null) => {
    setIsAddModalOpen((state) => !state);
    if (todo) {
      addNewTodo(todo);
    }
  };

  const changeNewTodoTitle = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodo((state) => ({ ...state, title: value }));
  };

  const keyEnterPress = (e) => {
    if (e.key === "Enter" && newTodo.title.length) {
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
          <Checkbox>
            {todo.isComplete ? <GrCheckboxSelected /> : <GrCheckbox />}
          </Checkbox>
          {todo.title}
        </Title>
        <ButtonsWrapper>
          {nestedLevel < nestedLimit && todo.children.length > 0 && (
            <ToggleChildrenButton
              onClick={() => toggleIsTodoShowChildren(todo)}
              isShowChildren={todo.isShowChildren}
            >
              {todo.isShowChildren ? <BiChevronLeft /> : <BiChevronLeft />}
            </ToggleChildrenButton>
          )}
          {todo.isComplete && (
            <RemoveButton onClick={toggleRemoveModalVisibility}>
              <IoMdAdd />
            </RemoveButton>
          )}
          {nestedLevel < nestedLimit && !todo.isComplete && (
            <AddButton onClick={toggleAddModalVisibility}>
              <IoMdAdd />
            </AddButton>
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
            <ModalTitle>Are you sure you want to delete?</ModalTitle>
            <ModalButtonsWrapper>
              <ModalButton onClick={() => toggleRemoveModalVisibility(todo)}>
                Yes
              </ModalButton>
              <ModalButton onClick={toggleRemoveModalVisibility}>
                No
              </ModalButton>
            </ModalButtonsWrapper>
          </ModalInner>
        </ModalOuter>
      )}
      {isAddModalOpen && (
        <ModalOuter>
          <ModalInner>
            <ModalTitle>What do you want to do?</ModalTitle>
            <ModalInput
              type="text"
              placeholder="Ex.: Do a homework"
              onChange={changeNewTodoTitle}
              value={newTodo.title}
              onKeyPress={keyEnterPress}
            />
            <ModalButtonsWrapper>
              <ModalButton
                onClick={() => {
                  if (newTodo.title.length) {
                    toggleAddModalVisibility(todo);
                    setNewTodo((state) => ({ ...state, title: "" }));
                  }
                }}
              >
                Add
              </ModalButton>
              <ModalButton onClick={toggleAddModalVisibility}>
                Cancel
              </ModalButton>
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
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  transition: 0.1s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  :hover {
    background: #ddd;
  }
`;

const Title = styled.span`
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  font-size: 18px;
  font-family: "Roboto Slab", serif;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 0;
  font-size: 24px;
  padding: 0;
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

const Checkbox = styled.button`
  font-size: 20px;
  background: transparent;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  :hover {
    cursor: pointer;
  }
`;

const ToggleChildrenButton = styled(Button)`
  font-size: 28px;
  svg {
    transition: 0.2s ease;
    transform: ${(props) => (props.isShowChildren ? "rotate(-90deg)" : "")};
  }
`;

const AddButton = styled(Button)``;

const RemoveButton = styled(Button)`
  svg {
    transform: rotate(45deg);
  }
`;

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
  padding-bottom: 40px;
`;

const ModalInput = styled.input`
  font-family: "Roboto", sans-serif;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 6px 12px;
  font-size: 16px;
  :focus {
    border-color: lightsteelblue;
  }
`;

const ModalButtonsWrapper = styled.div`
  padding-top: 20px;
`;

const ModalButton = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  transition: 0.1s ease;
  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
    background: #eee;
  }
  :active {
    border-color: lightsteelblue;
  }
`;
