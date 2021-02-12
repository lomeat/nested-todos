import styled from "styled-components";

export const EditListWrapper = styled.form`
  display: flex;
  padding: 80px 0 40px 0;
`;

export const Input = styled.input`
  font-family: "Roboto", sans-serif;
  border: 0;
  border-bottom: 1px solid #eee;
  padding: 4px 10px;
  background: transparent;
  :focus {
    border-color: lightsteelblue;
  }
`;

export const Button = styled.button`
  margin-left: 10px;
  background: transparent;
  border: 0;
  font-size: 22px;
  padding: 0;
  border-radius: 8px;
  width: 32px;
  height: 32px;
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

export const AddNewTodoButton = styled(Button)``;

export const RemoveAllButton = styled(Button)``;

export const TreeWrapper = styled.div`
  width: 100%;
`;
