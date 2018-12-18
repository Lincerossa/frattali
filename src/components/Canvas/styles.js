import styled from 'styled-components'


export const CanvasWrapper = styled.div`
  
`

export const CanvasInner = styled.div`
  height: calc(100vh);
  width: calc(100vw);
  position: relative;
  background-color: rgb(29, 24, 35);
`

export const CanvasPanel = styled.div`
  background: #ac00ff;
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 1rem;
  transform: translate(-50%,-50%);
`

export const ModalOverlayClose = styled.div`
  background: #ac00ff;
  color: white;
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1rem;
`

export const CanvasControllerWrapper = styled.div`
  display: flex;
  color: #ac00ff;
  margin: .5rem;
`
export const CanvasController = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color:  #ac00ff;
  border: 1px solid white;
  min-width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  ${props => props.isActive && `
    background-color:  #ac00ff;
    color: white;
    border: 1px solid white;
  
  `}

  &:hover{
    background-color:  #ac00ff;
    color: white;
    border: 1px solid white;
  }
`

export const CanvasValue = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 1.5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ac00ff;
  color: white;
`

export const ColorPicker = styled.div``