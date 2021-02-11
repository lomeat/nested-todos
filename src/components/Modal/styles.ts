import styled from "styled-components";
import ReactAnim from "react-animejs";

const { Anime } = ReactAnim;

export const ModalOuter = styled(Anime)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 1;
`;

export const ModalInner = styled(Anime)`
  position: fixed;
  top: -20%;
  left: 35%;
  z-index: 2;
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
