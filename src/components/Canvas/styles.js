import styled from 'styled-components'


export const CanvasWrapper = styled.div`
  
`

export const CanvasInner = styled.div`
  height: calc(100vh);
  position: relative;

  background-color: rgb(29, 24, 35);
`

export const CanvasPanel = styled.div`
  display: flex;
  background: #ac00ff;
  color: white;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-around;
`
export const CanvasController = styled.div`
  cursor: pointer;
  background: white;
  color:  #ac00ff;
  min-width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CanvasValue = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
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