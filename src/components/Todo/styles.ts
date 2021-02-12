import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  transition: 0.1s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  transition: 0.1s ease;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

type TitleProps = {
  isComplete: boolean;
};

export const Title = styled.span<TitleProps>`
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  font-size: 18px;
  font-family: "Roboto Slab", serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color};
  transition: 0.4s ease;

  @media screen and (max-width: 500px) {
    font-size: 22px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 0;
  font-size: 24px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.iconColor};
  transition: 0.1s ease;

  :first-child {
    margin-left: 0;
  }

  :hover {
    cursor: pointer;
    color: ${(props) => props.theme.color};
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Checkbox = styled.button`
  font-size: 20px;
  background: transparent;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  transition: 0.4s ease;
  color: ${(props) => props.theme.color};
  :hover {
    cursor: pointer;
  }

  svg {
    rect {
      transition: 0.4s ease;
      stroke: ${(props) => props.theme.color};
    }
  }
`;

type showChildrenProps = {
  delayShowChildren: boolean;
  delayTime?: number;
};

export const ToggleChildrenButton = styled(Button)<showChildrenProps>`
  font-size: 28px;
  svg {
    transition: 0.4s ease;
    transform: ${(props) => (props.delayShowChildren ? "rotate(180deg)" : "")};
  }
`;

export const ListLeftMargin = styled.div<showChildrenProps>`
  margin-left: 20px;
  overflow: hidden;

  transition: max-height
    ${(props) =>
      props.delayShowChildren
        ? `${props.delayTime}ms ease-in`
        : `${props.delayTime}ms ease-out`};
  max-height: ${(props) => (props.delayShowChildren ? "1000px" : "0px")};
`;

export const AddButton = styled(Button)``;

export const RemoveButton = styled(Button)`
  svg {
    transform: rotate(45deg);
  }
`;

export const ModalOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalInner = styled.div`
  z-index: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  font-family: "Roboto", sans;
  padding-bottom: 40px;
`;

export const ModalInput = styled.input`
  font-family: "Roboto", sans-serif;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 6px 12px;
  font-size: 16px;
  :focus {
    border-color: lightsteelblue;
  }
`;

export const ModalButtonsWrapper = styled.div`
  padding-top: 20px;
`;

export const ModalButton = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  transition: 0.1s ease;
  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
    background: #eee;
  }
  :active {
    border-color: lightsteelblue;
  }
`;
