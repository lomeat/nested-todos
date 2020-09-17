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
}: Props) => {
  const renderTypeModal = (type: string) => {
    if (type === "add")
      return <AddModal toggle={toggleVisibility} data={data} />;
    else if (type === "remove")
      return <RemoveModal toggle={toggleVisibility} data={data} />;
  };

  return (
    isModalOpen && (
      <SC.ModalOuter>
        <SC.ModalInner>{renderTypeModal(type)}</SC.ModalInner>
      </SC.ModalOuter>
    )
  );
};
