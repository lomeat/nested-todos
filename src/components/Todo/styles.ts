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
  :hover {
    background: #ddd;
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
  color: #777;
  transition: 0.1s ease;

  :first-child {
    margin-left: 0;
  }
  :hover {
    cursor: pointer;
    color: black;
    background: #ddd;
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
  :hover {
    cursor: pointer;
  }
`;

type ToggleChildrenButtonProps = {
  isShowChildren: boolean;
};

export const ToggleChildrenButton = styled(Button)<ToggleChildrenButtonProps>`
  font-size: 28px;
  svg {
    transition: 0.2s ease;
    transform: ${(props) => (props.isShowChildren ? "rotate(-90deg)" : "")};
  }
`;

export const AddButton = styled(Button)``;

export const RemoveButton = styled(Button)`
  svg {
    transform: rotate(45deg);
  }
`;

export const ListLeftMargin = styled.div`
  margin-left: 20px;
`;
