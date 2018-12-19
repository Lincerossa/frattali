
import { useEffect, useState } from 'react'

 export default () => {
  const [ mousePosition, setMousePosition ] =  useState(null)
  const [ mouseStatus, setMouseStatus ] =  useState(null)


  function handleMouseDown(){
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp) 
    window.addEventListener("touchmove",handleMouseMove)
    window.addEventListener("touchend", handleMouseUp) 
    setMouseStatus("mousedown")
  }

  function handleMouseUp(){
    setMouseStatus("mouseup")
  }

  function handleMouseMove(e){
    setMousePosition ({
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