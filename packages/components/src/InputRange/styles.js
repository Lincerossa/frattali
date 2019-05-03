import styled from 'styled-components'

export const InputRange = styled.input`
  background-color: white;
  border: none;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: .5rem;
  border-radius: .5rem;
  position: relative;
  z-index: 1;

  &:active, &:focus{
    outline: none;
  }

  &:after{
    content: "${props => props.value}";
    position: absolute;
    left: ${props =>
      `calc(${((props.value - props.min) / (props.max - props.min)) *
        100}% - .375rem)`};
    background-color: black;
    color: "red";
    width: .75rem;
    height: .75rem;
    transform:  ${props =>
      `translate(-${((props.value - props.min) / (props.max - props.min)) *
        16}px , -50%)`};
    padding: .5rem;
    border-radius: 50%;
    top: 50%;
    cursor: pointer;
    font-size: .875rem;
    border: 1px solid violet;
    display: flex;
    align-items: center;
    justify-content: center;
  }

`
