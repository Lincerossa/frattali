import React, { useState, useRef, useEffect, useReducer } from 'react'
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
  const { mousePosition, mouseStatus }   = useMouse() 
  const { canvasCenter } =  useCanvasCenter(canvas)
  const [ points, updatePoints ] =  useState([])
  const [ lines, updateLines] = useReducer(linesReducer, [[]]);
  const [ frattali, updateFrattali ] =  useState(30)
  const [ effect, updateEffect ] =  useState(null)





  useEffect(() => {
    const ctx = canvas && canvas.current.getContext("2d")
    if(lines && lines.length){
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]
        if(!line.length  || !line[0]) return
        drawFrattali({ctx, line, frattali, canvasCenter, effect})
      }      
    }
  }, [points]);

  useEffect(() => {
    const lastPoint = points && points.length && points[points.length -1 ]
    const isMousePositionIsChangedFromTheLastPoint = !lastPoint || 
      lastPoint.x !== mousePosition.x ||
      lastPoint.y !== mousePosition.y

    if(isMousePositionIsChangedFromTheLastPoint){
      const lastLine = lines[lines.length -1]
      if(mouseStatus === "mousedown"){
        updatePoints([...points, mousePosition].filter(e => e))
        updateLines({type:'POINT_ADD', payload: mousePosition})
      }
      if(mouseStatus === "mouseup" && lastLine.length){
        updateLines({type:'LINE_ADD'})
      }
    }

  }, [mousePosition]);

  function clearCanvas(){
    updatePoints([])
    updateLines({type:'CLEAR'})
  }

  function handleUpdateFrattali(value){
    clearCanvas()
    updateFrattali(value)
  }
  function handleUpdateEffect(effect){
    clearCanvas()
    updateEffect(effect)
  }

  return(
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height}  ref={canvas} />
        <S.CanvasValue>{frattali}</S.CanvasValue>
      </S.CanvasInner>

      <S.CanvasPanel>
        <S.CanvasControllerWrapper>
          <S.CanvasController onClick={() => handleUpdateFrattali(frattali-1)}>-</S.CanvasController>
          <S.CanvasController onClick={() => handleUpdateFrattali(frattali+1)}>+</S.CanvasController>
        </S.CanvasControllerWrapper>
        
        <S.CanvasControllerWrapper>
          <S.CanvasController onClick={clearCanvas}>Repaint</S.CanvasController>
        </S.CanvasControllerWrapper>

        <S.CanvasControllerWrapper>
          <S.CanvasController isActive={effect === "noise"} onClick={() => handleUpdateEffect("noise")}>Noise</S.CanvasController>
          <S.CanvasController isActive={effect === "tree"} onClick={() => handleUpdateEffect("tree")}>Tree</S.CanvasController>
          <S.CanvasController isActive={effect === null} onClick={() => handleUpdateEffect(null)}>No Effect</S.CanvasController>
        </S.CanvasControllerWrapper>

      </S.CanvasPanel>

    </S.CanvasWrapper> 
  )

}




export default Canvas