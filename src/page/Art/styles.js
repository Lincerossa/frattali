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
  right: 0;
  top:  0;  
  height: 2.5rem;
  border-bottom-left-radius: 1.5rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: #ac00ff;
  color: white;
`

export const Controller = styled.div`
  padding: 0 .5rem;
`



export const Panel = styled.div`
`

export const PanelBlock = styled.div`
  display: flex;
  margin-bottom: .5rem;
  border-bottom: 1px solid #ffffff61;
  padding-bottom: .5rem;
  font-family: sans-serif;
  font-size: 1.125rem;
`
export const PanelInner = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: .5rem;
  height: 1.5rem;
  color:  white;
  ${props => props.isActive && `
    color: white;
    color:  #ac00ff;
  `}

  &:hover{
    color: #ac00ff;
  }
`

export const ColorPicker = styled.div``