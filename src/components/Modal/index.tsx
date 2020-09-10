import * as React from "react";
import * as SC from "./styles";

import { AddModal } from "./AddModal";
import { RemoveModal } from "./RemoveModal";

type Props = {
  toggleVisibility: () => {};
  isModalOpen: boolean;
  type: string;
  args: any;
};

export const Modal: any = ({
  toggleVisibility,
  isModalOpen,
  type,
  args,
}: Props) =>
  isModalOpen && (
    <SC.ModalOuter>
      <SC.ModalInner>
        {type === "add" ? (
          <AddModal toggle={toggleVisibility} args={args} />
        ) : (
          <RemoveModal toggle={toggleVisibility} args={args} />
        )}
      </SC.ModalInner>
    </SC.ModalOuter>
  );
