import styled from 'styled-components'

export const CanvasWrapper = styled.div`
  position: relative;
  min-height: 200px;
`


export const Controllers = styled.div`
  position: absolute;
  right: .5rem;
  top: .5rem;  
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #343434;
  overflow-y: scroll;
  padding: 1rem;
  padding-top: 2.5rem;
  @media screen and (min-width: 600px) {
    left: auto;
  }

`

export const PanelBlock = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-family: sans-serif;
  font-size: 1.125rem;
  border-bottom: 1px solid #ffffff3b;
  &:last-of-type {
    border-bottom: none;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
`

export const ColorPicker = styled.div`
`
export const PanelClose = styled.div`
color: white;
position: absolute;
top: 0.5rem;
right: 1rem;
font-size: 1.5rem;
cursor: pointer;
border: 1px solid;
display: flex;
align-items: center;
justify-content: center;

&:hover{
    color: ${props => props.theme.colors.main};
  }
`

export const PanelBlockTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-family: serif;
  font-size: 1.25rem;
  margin-bottom: .75rem;
  letter-spacing: .04rem;
  text-transform: uppercase;
`

export const ColorBlock = styled.div`
  background-color: ${props => props.color};
  height: 1rem;
  width: 1rem;
  border: 1px solid white;
  margin-left: .5rem;
`


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
    background-color: red;
    left: ${props => `calc(${((props.value - props.min)/ (props.max - props.min))*100}% - .375rem)`};
    background-color: black;
    color: ${props => props.theme.colors.main};
    width: .75rem;
    height: .75rem;
    transform:  ${props => `translate(-${((props.value - props.min)/ (props.max - props.min))*16}px , -50%)`};
    padding: .5rem;
    border-radius: 50%;
    top: 50%;
    cursor: pointer;
    font-size: .875rem;
    border: 1px solid ${props => props.theme.colors.main};
    display: flex;
    align-items: center;
    justify-content: center;
  }

`