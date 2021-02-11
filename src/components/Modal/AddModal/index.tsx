import * as React from "react";

import * as SC from "./styles";

type Props = {
  toggle: () => {};
  data: {
    changeNewTodoTitle: (e: any) => {};
    newTodoTitle: string;
    keyEnterPress: (e: any) => {};
    checkAddingTitleLength: () => {};
  };
};

export const AddModal: React.FC<Props> = ({ toggle, data }) => (
  <>
    <SC.ModalTitle>What do you want to do?</SC.ModalTitle>
    <SC.ModalInput
      type="text"
      placeholder="Ex.: Do a homework"
      onChange={data.changeNewTodoTitle}
      value={data.newTodoTitle}
      onKeyDown={data.keyEnterPress}
      autoFocus
    />
    <SC.ModalButtonsWrapper>
      <SC.ModalButton onClick={data.checkAddingTitleLength}>Add</SC.ModalButton>
      <SC.ModalButton onClick={() => toggle()}>Cancel</SC.ModalButton>
    </SC.ModalButtonsWrapper>
  </>
);
