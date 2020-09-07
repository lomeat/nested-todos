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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
            <h2>Are you sure?</h2>
            <div>
              <button onClick={() => toggleRemoveModalVisibility(todo)}>
                yes
              </button>
              <button onClick={toggleRemoveModalVisibility}>no</button>
            </div>
          </ModalInner>
        </ModalOuter>
      )}
      {isAddModalOpen && (
        <ModalOuter>
          <ModalInner>
            <h2>Do you want to add new todo?</h2>
            <input
              placeholder="Type your todo..."
              onChange={changeNewTodoTitle}
              value={newTodo.title}
            />
            <div>
              <button
                onClick={() => {
                  if (newTodo.title.length) {
                    toggleAddModalVisibility(todo);
                    setNewTodo((state) => ({ ...state, title: "" }));
                  }
                }}
              >
                yes
              </button>
              <button onClick={toggleAddModalVisibility}>no</button>
            </div>
          </ModalInner>
        </ModalOuter>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 4px;
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
  font-size: 24px;
  padding: 0 10px;
`;

const ButtonsWrapper = styled.div``;

const Button = styled.button`
  margin-left: 10px;
  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
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
