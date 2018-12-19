import React, { useState, useRef, useEffect, useReducer } from 'react'

import ColorPicker from '../ColorPicker'
import ModalOverlay from '../ModalOverlay'

import * as S from './styles'
import { useMouse, useCanvasCenter } from '../../useHooks'
import { drawFrattali } from './draw'


const defaultLine = [[]]

function linesReducer(state = defaultLine, {type, payload}) {
  let newLines = [...state]
  const lastLine = newLines[newLines.length -1 ]
  switch (type) {
    case "POINT_ADD":
      return [...newLines.slice(0, newLines.length -1), [...lastLine, payload]]
    case "LINE_ADD":
      return [...newLines, []]
    case "CLEAR":
      return defaultLine
    default:
      return state
  }
}

function Canvas({width, height}){
  const canvas = useRef(null);
  const { mousePosition, mouseStatus }  = useMouse() 
  const { canvasCenter } =  useCanvasCenter(canvas)
  const [ points, setPoints ] =  useState([])
  const [ lines, setLines] = useReducer(linesReducer, [[]]);
  const [ frattali, setFrattali ] =  useState(2)
  const [ effect, setEffect ] =  useState(null)
  const [ color, setColor ] = useState("white")
  const [ isModalOpen, setModal ] = useState(0)


  useEffect(() => {
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l]
      if(!line.length  || !line[0]) return
      drawFrattali({ctx: canvas.current.getContext("2d"), line, frattali, canvasCenter, effect, color})
    }  
  }, [points]);

  useEffect(() => {
    if(mouseStatus === "mousedown"){
      setPoints([...points, mousePosition].filter(e => e))
      setLines({type:'POINT_ADD', payload: mousePosition})
    }
    if(mouseStatus === "mouseup" && lines[lines.length -1].length){
      setLines({type:'LINE_ADD'})
    }
  }, [mousePosition]);

  function clearCanvas(){
    setPoints([])
    setLines({type:'CLEAR'})
  }

  return(
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height}  ref={canvas} />
        <S.CanvasValue onClick={() => setModal(true)}>{frattali}</S.CanvasValue>
      </S.CanvasInner>
      {
        isModalOpen && <ModalOverlay>
        <S.CanvasPanel>
          <S.ModalOverlayClose onClick={() => setModal(false)}>x</S.ModalOverlayClose>
          <S.CanvasControllerWrapper>
            <S.CanvasController onClick={() => {
              clearCanvas()
              setFrattali(frattali-1)}
            }>-</S.CanvasController>
            <S.CanvasController onClick={() => {
              clearCanvas()
              setFrattali(frattali+1)}
            }>+</S.CanvasController>
          </S.CanvasControllerWrapper>
          
          <S.CanvasControllerWrapper>
            <S.CanvasController onClick={clearCanvas}>Repaint</S.CanvasController>
          </S.CanvasControllerWrapper>

          <S.CanvasControllerWrapper>
            <S.CanvasController isActive={effect === "noise"} onClick={() => {
              clearCanvas()
              setEffect("noise")}
            }>Noise</S.CanvasController>
            <S.CanvasController isActive={effect === "tree"} onClick={() => {
              clearCanvas()
              setEffect("tree")}
            }>Tree</S.CanvasController>
            <S.CanvasController isActive={!effect} onClick={() => {
              clearCanvas()
              setEffect(null)}
            }>no effect</S.CanvasController>
          </S.CanvasControllerWrapper>
          <S.CanvasControllerWrapper>
            <ColorPicker color={color} setColor={color => {
              clearCanvas()
              setColor(color)
            }} />
          </S.CanvasControllerWrapper>
        </S.CanvasPanel>

      </ModalOverlay>}
      
    </S.CanvasWrapper> 
  )

}




export default Canvas