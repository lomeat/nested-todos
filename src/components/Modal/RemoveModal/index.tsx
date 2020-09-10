import * as React from "react";

import * as SC from "./styles";

type Props = {
  toggle: (id?: TodoId) => {};
  data: {
    id: number;
  };
};

export const RemoveModal: React.FC<Props> = ({ toggle, data }) => (
  <>
    <SC.ModalTitle>Are you sure you want to delete?</SC.ModalTitle>
    <SC.ModalButtonsWrapper>
      <SC.ModalButton onClick={() => toggle(data.id)}>Yes</SC.ModalButton>
      <SC.ModalButton onClick={() => toggle()}>No</SC.ModalButton>
    </SC.ModalButtonsWrapper>
  </>
);
