import styled from "styled-components";

export const Welcome = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: black;
  justify-content: center;
`;

export const Picture = styled.div`
  background-image: url("${props => props.backgroundImage}");
  background-position: center center;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  background-size: contain;
  position: relative;
`;

export const Nickname = styled.div`
  font-family: sans-serif;
  font-size: 3rem;
  position: absolute;
  top: 100%;
  color: white;
`;
