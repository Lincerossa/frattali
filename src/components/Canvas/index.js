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
  const [ lines, handleUpdateLines] = useReducer(linesReducer, [[]]);
  const [ frattali, updateFrattali ] =  useState(10)

  useEffect(() => {
    const ctx = canvas && canvas.current.getContext("2d")
    if(lines && lines.length){
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]
        if(!line.length  || !line[0]) return
        drawFrattali({ctx, line, frattali, canvasCenter})
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
        handleUpdateLines({type:'POINT_ADD', payload: mousePosition})
      }
      if(mouseStatus === "mouseup" && lastLine.length){
        handleUpdateLines({type:'LINE_ADD'})
      }
    }

  }, [mousePosition]);

  function clearCanvas(){
    const ctx = canvas && canvas.current.getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    updatePoints([])
    handleUpdateLines({type:'CLEAR'})
    console.log(lines)
  }

  function handleUpdateFrattali(value){
    clearCanvas()
    updateFrattali(value)
  }
  

  return(
    <S.CanvasWrapper>
      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height}  ref={canvas} />
        <S.CanvasValue>{frattali}</S.CanvasValue>
      </S.CanvasInner>
      <S.CanvasPanel>
        <S.CanvasController onClick={() => handleUpdateFrattali(frattali-1)}>-</S.CanvasController>
        <S.CanvasController onClick={clearCanvas}>Repaint</S.CanvasController>
        <S.CanvasController onClick={() => handleUpdateFrattali(frattali+1)}>+</S.CanvasController>
      </S.CanvasPanel>
    </S.CanvasWrapper> 
  )

}




export default Canvas