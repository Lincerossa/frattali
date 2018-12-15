import React, { useState, useRef, useEffect } from 'react'
import * as S from './styles'


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



function drawMainLine(ctx, line){
  ctx.beginPath();
  ctx.moveTo(line[0].x, line[0].y);
  
  for (let p = 0; p < line.length; p++) {
    const point = line[p];
    ctx.lineTo(point.x, point.y)
    
  }
  ctx.stroke();
  ctx.closePath();


}



function Canvas({currentTime, width, height}){
  const canvas = useRef(null);
  const [ mousePosition, updateMousePosition ] =  useState(null)
  const [ mouseStatus, updateMouseStatus ] =  useState(null)
  const [ lines, updateLines ] =  useState([[]])
  const [ points, updatePoints ] =  useState([])

  function handleUpdateCanvas(){

    const ctx = canvas && canvas.current.getContext("2d")

    if(lines && lines.length){
      

      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]
        if(!line.length  || !line[0]) return

        drawMainLine(ctx, line)

        
      }      
    }
  }

  useEffect(() => {
    handleUpdateCanvas()
    console.log({points, lines})
  }, [points]);


  function handleUpdateLines(action){
    const newLines = linesReducer(lines, action)
    updateLines(newLines)
  }

  function handleUpdatePoints(){
    updatePoints([...points, mousePosition].filter(e => e))
  }

  useEffect(() => {
    const lastPoint = points && points.length && points[points.length -1 ]
    const isMousePositionIsChangedFromTheLastPoint = !lastPoint || 
      lastPoint.x !== mousePosition.x ||
      lastPoint.y !== mousePosition.y

    if(isMousePositionIsChangedFromTheLastPoint){
      const lastLine = lines[lines.length -1]

      if(mouseStatus === "mousedown"){
        handleUpdatePoints()
        handleUpdateLines({type:'POINT_ADD', payload: mousePosition})
      }
      if(mouseStatus === "mouseup" && lastLine.length){
        handleUpdateLines({type:'LINE_ADD'})
      }
    }

  }, [mousePosition]);


  useEffect(() => {
    window.addEventListener("mousedown", () => updateMouseStatus("mousedown"))
    window.addEventListener("mouseup", () => updateMouseStatus("mouseup"))
    window.addEventListener("mousemove", (e) =>  updateMousePosition({
      x: e.clientX,
      y: e.clientY
    }))
  }, []);


  return(
    <S.CanvasWrapper>
      <canvas id="canvas" width={width} height={height}  ref={canvas} />
    </S.CanvasWrapper> 
  )

}


export default Canvas