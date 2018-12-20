import styled from 'styled-components'


export const CanvasWrapper = styled.div`
  
`

export const CanvasInner = styled.div`
  height: calc(100vh);
  width: calc(100vw);
  position: relative;
  background-color: rgb(29, 24, 35);
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