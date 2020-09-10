import * as React from "react";

import * as SC from "./styles";

type Props = {
  toggle: () => {};
  args: {
    changeNewTodoTitle: (e: any) => {};
    newTodoTitle: string;
    keyEnterPress: (e: any) => {};
    checkAddingTitleLength: () => {};
  };
};

export const AddModal: React.FC<Props> = ({ toggle, args }) => (
  <>
    <SC.ModalTitle>What do you want to do?</SC.ModalTitle>
    <SC.ModalInput
      type="text"
      placeholder="Ex.: Do a homework"
      onChange={args.changeNewTodoTitle}
      value={args.newTodoTitle}
      onKeyDown={args.keyEnterPress}
    />
    <SC.ModalButtonsWrapper>
      <SC.ModalButton onClick={args.checkAddingTitleLength}>Add</SC.ModalButton>
      <SC.ModalButton onClick={() => toggle()}>Cancel</SC.ModalButton>
    </SC.ModalButtonsWrapper>
  </>
);
