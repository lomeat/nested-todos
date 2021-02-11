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
      <SC.ModalOuter
        onClick={toggleVisibility}
        id="outer"
        initial={[
          {
            targets: "#outer",
            background: "rgba(0, 0, 0, 0.3)",
            easing: "linear",
            duration: 500,
          },
        ]}
      >
        <SC.ModalInner
          id="inner"
          initial={[
            {
              targets: "#inner",
              duration: 500,
              top: "35%",
            },
          ]}
        >
          {renderTypeModal(type)}
        </SC.ModalInner>
      </SC.ModalOuter>
    )
  );
};
