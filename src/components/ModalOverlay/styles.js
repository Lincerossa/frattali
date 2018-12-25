import styled from "styled-components"

export const ModalInner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: black;
  padding: 1.5rem;
  border: 1px solid white;
  &:focus{
    outline: none;
  }
`
export const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  font-family: sans-serif;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  &:hover{
    color: ${props => props.theme.colors.main};
  }
`