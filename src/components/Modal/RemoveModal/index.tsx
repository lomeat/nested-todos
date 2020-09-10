import * as React from "react";

import * as SC from "./styles";

type Props = {
  toggle: (id?: TodoId) => {};
  args: {
    id: number;
  };
};

export const RemoveModal: React.FC<Props> = ({ toggle, args }) => (
  <>
    <SC.ModalTitle>Are you sure you want to delete?</SC.ModalTitle>
    <SC.ModalButtonsWrapper>
      <SC.ModalButton onClick={() => toggle(args.id)}>Yes</SC.ModalButton>
      <SC.ModalButton onClick={() => toggle()}>No</SC.ModalButton>
    </SC.ModalButtonsWrapper>
  </>
);
