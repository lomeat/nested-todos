import styled from "styled-components";

export const ModalTitle = styled.h2`
  font-family: "Roboto", sans;
  padding-bottom: 40px;
`;

export const ModalInput = styled.input`
  font-family: "Roboto", sans-serif;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 6px 12px;
  color: ${(props) => props.theme.color};
  font-size: 16px;
  background: rgba(0, 0, 0, 0.2);
  :focus {
    border-color: lightsteelblue;
  }
`;

export const ModalButtonsWrapper = styled.div`
  padding-top: 20px;
`;

export const ModalButton = styled.button`
  margin-left: 10px;
  color: ${(props) => props.theme.color};
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
    background: rgba(0, 0, 0, 0.3);
  }
  :active {
    border-color: lightsteelblue;
  }
`;
