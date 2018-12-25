import styled from 'styled-components'


export const CanvasWrapper = styled.div`
  
`

export const CanvasInner = styled.div`
  height: calc(100vh);
  width: calc(100vw);
  position: relative;
  background-color: rgb(29, 24, 35);
`


export const Controllers = styled.div`
  position: absolute;
  right: .5rem;
  top: .5rem;  
  display: flex;
 
  align-items: center;
  justify-content: center;
`

export const Controller = styled.div`
  
  font-size: 1.75rem;
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.main};
  color: white;
  margin-right: .5rem;
  
  &:last-of-type{
    margin:0;
  }
  &:active{
    background-color: white;
    color: ${props => props.theme.colors.main};
  }
  &:focus{
    outline: none;
  }

  @media screen and (min-width: 600px) {
    &:hover{
      background-color: white;
      color: ${props => props.theme.colors.main};
    }
  }
`


export const Panel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  padding: 1rem;
  padding-top: 2.5rem;
  border-bottom-left-radius: .5rem;
  border-top-left-radius: .5rem;
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

export const Button = styled.div`
  cursor: pointer;
  margin-right: .5rem;
  height: 1.5rem;
  border: 1px solid;
  padding: .5rem;
  color: white;
  display: flex;
  align-items: center;
  ${props => props.isActive && `
    color:  ${props => props.theme.colors.main};
  `}

  &:hover{
    color: ${props => props.theme.colors.main};
  }
`

export const ColorPicker = styled.div`
`
export const PanelClose = styled.div`
color: white;
position: absolute;
top: 0.5rem;
right: .5rem;
font-size: 1.5rem;
cursor: pointer;

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
  cursor: pointer;
  width: 100%;
  cursor: pointer;
  width: 100%;
  font-size: red;
  background-color: ${props => props.theme.colors.main};
  border: none;
  -webkit-appearance: none;
  height: .5rem;
  border-radius: .5rem;
  position: relative;
  &:active, &:focus{
    outline: none;
  }
  &:active&:after{
    opacity: 1;
  }

  &:after{
    content: "${props => props.value}";
    opacity: 0;
    transition: opacity .5s;
    position: absolute;
    background-color: red;
    left: ${props => `calc(${(props.value/ props.max)*100}% - .75rem)`};
    background-color: black;
    color: ${props => props.theme.colors.main};
    width: 1.5rem;
    height: 1.5rem;
    top: -50%;
    padding: .5rem;
    border: 1px solid ${props => props.theme.colors.main};
    transform: translate(-.75rem,-.75rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

`