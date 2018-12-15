import React, { useState, useRef, useEffect, useReducer } from 'react'
import * as S from './styles'
import useMouse from '../../useHooks/useMouse'

function linesReducer(state, {type, payload}) {
  let newLines = [...state]
  const lastLine = newLines[newLines.length -1 ]
  switch (type) {
    case "POINT_ADD":
      return [...newLines.slice(0, newLines.length -1), [...lastLine, payload]]
    case "LINE_ADD":
      return [...newLines, []]
    default:
      return state
  }
}


function Canvas({currentTime, width, height}){
  const canvas = useRef(null);
  const {mousePosition, mouseStatus}   = useMouse() 
  const [ points, updatePoints ] =  useState([])
  const [ lines, handleUpdateLines] = useReducer(linesReducer, [[]]);

  useEffect(() => {
    const ctx = canvas && canvas.current.getContext("2d")

    if(lines && lines.length){
      
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]
        if(!line.length  || !line[0]) return
        
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        
        for (let p = 0; p < line.length; p++) {
          const point = line[p];
          ctx.lineTo(point.x, point.y)
          
        }
        ctx.stroke();
        ctx.closePath();

        // draw frattali
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
  

  return(
    <S.CanvasWrapper>
      <canvas id="canvas" width={width} height={height}  ref={canvas} />
    </S.CanvasWrapper> 
  )

}




export default Canvas