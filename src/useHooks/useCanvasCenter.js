
import { useEffect, useState } from 'react'

export default (canvas) => {
 const [ canvasCenter, updateCanvasCenter ] =  useState(null)

 useEffect(() => {
   console.log({canvas})
  const { offsetHeight, offsetWidth, offsetTop,offsetLeft } = canvas && canvas.current
  updateCanvasCenter({
    y: (offsetHeight / 2) - offsetTop,
    x: (offsetWidth / 2) + offsetLeft,
  })

}, [canvas && canvas.current]);

 return {canvasCenter}

}