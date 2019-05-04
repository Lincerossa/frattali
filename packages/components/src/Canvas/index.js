import React, { useEffect, useRef, useState } from 'react'
import { drawBackground, drawLines } from './draw'

export default ({ width = 500, height = 500, backgroundColor, hd, lines }) => {
  const canvas = useRef(null)
  const [center, setCenter] = useState(null)

  useEffect(() => {
    if (!canvas || !canvas.current) return
    const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = canvas.current

    setCenter({
      y: offsetHeight / 2 - offsetTop,
      x: offsetWidth / 2 + offsetLeft,
    })
  }, [canvas, canvas.current])

  useEffect(() => {
    if (hd) {
      canvas.current.style.width = `${window.innerWidth}px`
      canvas.current.style.height = `${window.innerHeight}px`
      const ratio = window.devicePixelRatio
      canvas.current.width = width * ratio
      canvas.current.height = height * ratio
      canvas.current.getContext('2d').scale(ratio, ratio)
      return
    }
    canvas.current.width = width
    canvas.current.height = height
  }, [canvas.current, width, height, hd])

  useEffect(() => {
    if (center) {
      drawBackground({
        ctx: canvas.current.getContext('2d'),
        backgroundColor,
        width,
        height,
      })
      drawLines({
        ctx: canvas.current.getContext('2d'),
        lines,
        center,
      })
    }

    return () => {
      canvas.current.getContext('2d').clearRect(0, 0, width, height)
    }
  }, [center, lines, backgroundColor, hd])

  return <canvas id="canvas" width={width} height={height} ref={canvas} />
}
