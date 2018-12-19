
import { useEffect, useState } from 'react'

export default (canvas) => {
 const [ canvasCenter, setCanvasCenter ] =  useState(null)

 useEffect(() => {

  const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = canvas && canvas.current
  
  setCanvasCenter({
    y: (offsetHeight / 2) - offsetTop,
    x: (offsetWidth / 2) + offsetLeft,
  })

}, [canvas && canvas.current]);

 return {canvasCenter}

}