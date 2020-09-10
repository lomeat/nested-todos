import * as React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  addTodoToExist,
  toggleIsTodoComplete,
  toggleIsTodoShowChildren,
  removeTodo,
} from "../../actions";

import { TodoTree } from "../TodoTree";
import { Modal } from "../Modal";
import * as SC from "./styles";

type Props = {
  todo: ITodo;
  nestedLevel: number;
};

export const Todo: React.FC<Props> = ({ todo, nestedLevel }) => {
  // Recursive count the level of nested lists...
  const newNestedLevel = nestedLevel + 1;
  // ...to make limit
  const nestedLimit = 3;

  const [isRemoveModalOpen, setIsRemoveModalOpen] = React.useState<boolean>(
    false
  );
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");

  const dispatch: Dispatch<TodoAction> = useDispatch();

  const addTodo: any = React.useCallback(
    (id: TodoId, title: string) => dispatch(addTodoToExist(id, title)),
    [dispatch]
  );

  const toggleComplete: any = React.useCallback(
    (id: TodoId) => dispatch(toggleIsTodoComplete(id)),
    [dispatch]
  );

  const toggleShow: any = React.useCallback(
    (id: TodoId) => dispatch(toggleIsTodoShowChildren(id)),
    [dispatch]
  );

  const remove: any = React.useCallback(
    (id: TodoId) => dispatch(removeTodo(id)),
    [dispatch]
  );

  const toggleRemoveModalVisibility = (id?: TodoId) => {
    setIsRemoveModalOpen((state) => !state);
    if (id) {
      remove(id);
    }
  };

  const toggleAddModalVisibility = (id?: TodoId) => {
    setIsAddModalOpen((state) => !state);
    if (id) {
      addTodo(id, newTodoTitle);
    }
  };

  const changeNewTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setNewTodoTitle(value);
  };

  const keyEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkAddingTitleLength();
    }
  };

  const checkAddingTitleLength = () => {
    if (newTodoTitle.length) {
      toggleAddModalVisibility(todo.id);
      setNewTodoTitle("");
    }
  };

  return (
    <>
      <SC.Wrapper key={todo.id}>
        <SC.Title
          isComplete={todo.isComplete}
          onClick={() => toggleComplete(todo.id)}
        >
          <SC.Checkbox>
            {todo.isComplete ? <GrCheckboxSelected /> : <GrCheckbox />}
          </SC.Checkbox>
          {todo.title}
        </SC.Title>
        <SC.ButtonsWrapper>
          {nestedLevel < nestedLimit && todo.children.length > 0 && (
            <SC.ToggleChildrenButton
              onClick={() => toggleShow(todo.id)}
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

      <Modal
        type="add"
        data={{
          changeNewTodoTitle,
          newTodoTitle,
          keyEnterPress,
          checkAddingTitleLength,
        }}
        toggleVisibility={toggleAddModalVisibility}
        isModalOpen={isAddModalOpen}
      />
      <Modal
        type="remove"
        data={{ id: todo.id }}
        toggleVisibility={toggleRemoveModalVisibility}
        isModalOpen={isRemoveModalOpen}
      />
    </>
  );
};
