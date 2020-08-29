import React from "react";
import styled from "styled-components";

export const Todo = ({ todo, toggleIsComplete }) => {
  return (
    <Wrapper key={todo.id}>
      <Title
        isComplete={todo.isComplete}
        onClick={() => toggleIsComplete(todo)}
      >
        {todo.title}
      </Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: 0.1s ease;
  :hover {
    background: #eee;
  }
`;

const Title = styled.span`
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  font-size: 24px;
`;
