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


function drawMain(ctx, line){
  ctx.beginPath();
        
  for (let p = 0; p < line.length; p++) {
    // point
    const { x: xp, y: yp } = line[p];
    ctx.lineTo(xp, yp)
  }
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.closePath();
}


function getCartesianPoint(point, center){
  // point
  const { x: xp, y: yp } = point;

  // center
  const { x: xc, y: yc } = center;

  return {
    x: xp - xc,
    y: yc - yp
  }
}

function getCanvasPoint(point, center){
  // point
  const { x: xp, y: yp } = point;

  // center
  const { x: xc, y: yc } = center;

  return {
    x: xc + xp,
    y: yc - yp
  }
}

function getAngle(x,y) {
  const alpha = Math.atan2(y, x) * 180 / Math.PI;
  return alpha < 0 ? 180 + (180 + alpha) : alpha
}


function drawFrattali({ctx, line, frattali, center}){
    
          
    for (let p = 0; p < line.length; p++) {

      // CARTESIANO/////////////
      const { x, y } = getCartesianPoint(line[p], center)
      const radius = Math.sqrt(Math.abs(Math.pow(x, 2) + Math.pow(y,2)))
      const pointAngle = getAngle(x,y)
      const angles = Array.from({length: frattali}, (e, index) =>( 360 / frattali)*(index + 1))
      
      
      // beta: da rifattorizzare correttamente
      
      for (let i = 0; i < angles.length; i++) {
        ctx.beginPath();
        const frattaleAngle = angles[i];
        const frattaleX = Math.cos((pointAngle - frattaleAngle)*Math.PI/180) * radius
        const frattaleY = Math.sin((pointAngle - frattaleAngle )*Math.PI/180) * radius
  
        const frattalePoint = getCanvasPoint({
          x: frattaleX,
          y: frattaleY
        }, center)

        
        ctx.moveTo(frattalePoint.x,frattalePoint.y);
        ctx.lineTo(frattalePoint.x+1, frattalePoint.y+1)
        ctx.strokeStyle="#ac00ff"
       
        ctx.stroke();
      }
    }
}

function Canvas({currentTime, width, height}){
  const canvas = useRef(null);
  const { mousePosition, mouseStatus }   = useMouse() 
  const [ points, updatePoints ] =  useState([])
  const [ center, updateCenter ] =  useState([])
  const [ frattali, updateFrattali ] =  useState(1)
  const [ lines, handleUpdateLines] = useReducer(linesReducer, [[]]);


  useEffect(() => {
    const myCanvas = canvas && canvas.current
    const ctx = canvas && canvas.current.getContext("2d")
    const { offsetHeight, offsetWidth, offsetTop,offsetLeft } = myCanvas

    const newCenter = {
      y: (offsetHeight / 2) - offsetTop,
      x: (offsetWidth / 2) + offsetLeft,
    }

    updateCenter(newCenter)
  }, [canvas && canvas.current]);

  useEffect(() => {
    const ctx = canvas && canvas.current.getContext("2d")
    if(lines && lines.length){
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l]
        if(!line.length  || !line[0]) return
        drawMain(ctx, line)
        drawFrattali({ctx, line, frattali, center})
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

      <S.CanvasInner>
        <canvas id="canvas" width={width} height={height}  ref={canvas} />
        <S.CanvasValue>{frattali}</S.CanvasValue>
      </S.CanvasInner>
      <S.CanvasPanel>
        <S.CanvasController onClick={() => updateFrattali(frattali-1)}>-</S.CanvasController>
        <S.CanvasController onClick={() => updateFrattali(frattali+1)}>+</S.CanvasController>
      </S.CanvasPanel>
    </S.CanvasWrapper> 
  )

}




export default Canvas