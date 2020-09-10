import * as React from "react";
import * as SC from "./styles";

import { AddModal } from "./AddModal";
import { RemoveModal } from "./RemoveModal";

type Props = {
  toggleVisibility: () => {};
  isModalOpen: boolean;
  type: string;
  data: any;
};

export const Modal: any = ({
  toggleVisibility,
  isModalOpen,
  type,
  data,
}: Props) =>
  isModalOpen && (
    <SC.ModalOuter>
      <SC.ModalInner>
        {type === "add" ? (
          <AddModal toggle={toggleVisibility} data={data} />
        ) : (
          <RemoveModal toggle={toggleVisibility} data={data} />
        )}
      </SC.ModalInner>
    </SC.ModalOuter>
  );
