
import { useEffect, useState } from 'react'

 export default () => {
  const [ mousePosition, updateMousePosition ] =  useState(null)
  const [ mouseStatus, updateMouseStatus ] =  useState(null)


  function handleMouseDown(){
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)    
    updateMouseStatus("mousedown")
  }

  function handleMouseUp(){
    updateMouseStatus("mouseup")
  }

  function handleMouseMove(e){
    updateMousePosition ({
      x: e.clientX,
      y: e.clientY
    })
  }


  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    
    return(() => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)    
      window.removeEventListener("mousemove",handleMouseMove)
    })

  }, []);

  return {
    mousePosition, 
    mouseStatus
  }

}