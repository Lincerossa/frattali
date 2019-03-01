import styled from "styled-components";

export const Loading = styled.div`
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

export const LoadingText = styled.div`
  font-family: sans-serif;
  font-size: 3rem;
  color: ${props => props.theme.colors.main};
`;
