import React, { Dispatch, FormEvent, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { connect } from "react-redux";

import { TodoTree } from "../TodoTree";
import * as SC from "./styles";

type TodoId = number;

export type TodoType = {
  id: TodoId;
  title: string;
  isComplete: boolean;
  isShowChildren: boolean;
  children: TodoType[];
};

type TodoProps = {
  todo: TodoType;
  nestedLevel: number;
  toggleIsTodoComplete: (id: TodoId) => TodoId;
  toggleIsTodoShowChildren: (id: TodoId) => TodoId;
  addTodo: (id: TodoId, title: string) => TodoId;
  removeTodo: (id: TodoId) => TodoId;
};

export const TodoComponent: any = ({
  todo,
  nestedLevel,
  toggleIsTodoComplete,
  toggleIsTodoShowChildren,
  addTodo,
  removeTodo,
}: TodoProps) => {
  // Recursive count the level of nested lists...
  const newNestedLevel = nestedLevel + 1;
  // ...to make limit
  const nestedLimit = 3;

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  const toggleRemoveModalVisibility = (todo: TodoType | null = null) => {
    setIsRemoveModalOpen((state) => !state);
    if (todo) {
      removeTodo(todo.id);
    }
  };

  const toggleAddModalVisibility = (todo: TodoType | null = null) => {
    setIsAddModalOpen((state) => !state);
    if (todo) {
      addTodo(todo.id, newTodoTitle);
    }
  };

  const changeNewTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodoTitle(value);
  };

  const keyEnterPress = (e: any) => {
    if (e.key === "Enter" && newTodoTitle.length) {
      toggleAddModalVisibility(todo);
      setNewTodoTitle("");
    }
  };

  return (
    <>
      <SC.Wrapper key={todo.id}>
        <SC.Title
          isComplete={todo.isComplete}
          onClick={() => toggleIsTodoComplete(todo.id)}
        >
          <SC.Checkbox>
            {todo.isComplete ? <GrCheckboxSelected /> : <GrCheckbox />}
          </SC.Checkbox>
          {todo.title}
        </SC.Title>
        <SC.ButtonsWrapper>
          {nestedLevel < nestedLimit && todo.children.length > 0 && (
            <SC.ToggleChildrenButton
              onClick={() => toggleIsTodoShowChildren(todo.id)}
              isShowChildren={todo.isShowChildren}
            >
              {todo.isShowChildren ? <BiChevronLeft /> : <BiChevronLeft />}
            </SC.ToggleChildrenButton>
          )}
          {todo.isComplete && (
            <SC.RemoveButton onClick={() => toggleRemoveModalVisibility()}>
              <IoMdAdd />
            </SC.RemoveButton>
          )}
          {nestedLevel < nestedLimit && !todo.isComplete && (
            <SC.AddButton onClick={() => toggleAddModalVisibility()}>
              <IoMdAdd />
            </SC.AddButton>
          )}
        </SC.ButtonsWrapper>
      </SC.Wrapper>

      <SC.ListLeftMargin>
        {todo.children &&
          newNestedLevel <= nestedLimit &&
          todo.isShowChildren && (
            <TodoTree nestedLevel={newNestedLevel} children={todo.children} />
          )}
      </SC.ListLeftMargin>

      {isRemoveModalOpen && (
        <SC.ModalOuter>
          <SC.ModalInner>
            <SC.ModalTitle>Are you sure you want to delete?</SC.ModalTitle>
            <SC.ModalButtonsWrapper>
              <SC.ModalButton onClick={() => toggleRemoveModalVisibility(todo)}>
                Yes
              </SC.ModalButton>
              <SC.ModalButton onClick={() => toggleRemoveModalVisibility()}>
                No
              </SC.ModalButton>
            </SC.ModalButtonsWrapper>
          </SC.ModalInner>
        </SC.ModalOuter>
      )}
      {isAddModalOpen && (
        <SC.ModalOuter>
          <SC.ModalInner>
            <SC.ModalTitle>What do you want to do?</SC.ModalTitle>
            <SC.ModalInput
              type="text"
              placeholder="Ex.: Do a homework"
              onChange={changeNewTodoTitle}
              value={newTodoTitle}
              onKeyDown={keyEnterPress}
            />
            <SC.ModalButtonsWrapper>
              <SC.ModalButton
                onClick={() => {
                  if (newTodoTitle.length) {
                    toggleAddModalVisibility(todo);
                    setNewTodoTitle("");
                  }
                }}
              >
                Add
              </SC.ModalButton>
              <SC.ModalButton onClick={() => toggleAddModalVisibility()}>
                Cancel
              </SC.ModalButton>
            </SC.ModalButtonsWrapper>
          </SC.ModalInner>
        </SC.ModalOuter>
      )}
    </>
  );
};

type Action =
  | { type: "TODO_ADD_TO_EXIST"; id: TodoId; title: string }
  | { type: "TODO_TOGGLE_COMPLETE"; id: TodoId }
  | { type: "TODO_TOGGLE_SHOW_CHILDREN"; id: TodoId }
  | { type: "TODO_REMOVE"; id: TodoId };

const mapDispatch = (dispatch: Dispatch<Action>) => ({
  addTodo: (id: TodoId, title: string) =>
    dispatch({ type: "TODO_ADD_TO_EXIST", id, title }),
  toggleIsTodoComplete: (id: TodoId) =>
    dispatch({ type: "TODO_TOGGLE_COMPLETE", id }),
  toggleIsTodoShowChildren: (id: TodoId) =>
    dispatch({ type: "TODO_TOGGLE_SHOW_CHILDREN", id }),
  removeTodo: (id: TodoId) => dispatch({ type: "TODO_REMOVE", id }),
});

export const Todo: any = connect(null, mapDispatch)(TodoComponent);
