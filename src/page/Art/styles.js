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
  background-color: #ac00ff;
  color: white;
  margin-right: .5rem;
  
  &:last-of-type{
    margin:0;
  }
  &:active{
    background-color: white;
    color: #ac00ff;
  }
  &:focus{
    outline: none;
  }

  @media screen and (min-width: 600px) {
    &:hover{
      background-color: white;
      color: #ac00ff;
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
  border-bottom: 1px solid white;
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
    color:  #ac00ff;
  `}

  &:hover{
    color: #ac00ff;
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
    color: #ac00ff;
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