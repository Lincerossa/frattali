import styled from 'styled-components'


export const CanvasWrapper = styled.div`
  
`

export const CanvasInner = styled.div`
  height: calc(100vh);
  width: calc(100vw);
  position: relative;
  background-color: rgb(29, 24, 35);
`


export const PanelOpen = styled.div`
  position: absolute;
  right: 0;
  top:  0;
  font-size: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border-bottom-left-radius: 1.5rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: #ac00ff;
  color: white;
`

export const ColorPicker = styled.div``