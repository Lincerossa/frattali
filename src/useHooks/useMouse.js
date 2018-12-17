
import { useEffect, useState } from 'react'

 export default () => {
  const [ mousePosition, updateMousePosition ] =  useState(null)
  const [ mouseStatus, updateMouseStatus ] =  useState(null)


  function handleMouseDown(){
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp) 
    window.addEventListener("touchmove",handleMouseMove)
    window.addEventListener("touchend", handleMouseUp) 
    updateMouseStatus("mousedown")
  }

  function handleMouseUp(){
    updateMouseStatus("mouseup")
  }

  function handleMouseMove(e){
    updateMousePosition ({
      x: e.clientX ||( e.touches && e.touches[0].clientX),
      y: e.clientY || (e.touches && e.touches[0].clientY)
    })
  }


  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("touchstart", handleMouseDown)
    
    return(() => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.addEventListener("touchstart", handleMouseDown)


      window.removeEventListener("mouseup", handleMouseUp)    
      window.removeEventListener("touchend", handleMouseUp)    
      window.removeEventListener("mousemove",handleMouseMove)
      window.removeEventListener("touchmove",handleMouseMove)
    })

  }, []);

  return {
    mousePosition, 
    mouseStatus
  }

}