function getFrattaliLines({ divisions, points, center }) {
  const frattaliLines = Array.from({ length: divisions }, e => [])

  for (let p = 0; p < points.length; p++) {
    const point = points[p]

    const radius = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))
    const alpha = (Math.atan2(point.y, point.x) * 180) / Math.PI
    const anglePointToCenter = alpha < 0 ? 360 + alpha : alpha

    for (let division = 0; division < divisions; division++) {
      const frattaleAngle = (360 / divisions) * (division + 1)
      const frattaleAlignedRadialAngle =
        ((anglePointToCenter - frattaleAngle) * Math.PI) / 180

      const frattalePoint = {
        x: Math.cos(frattaleAlignedRadialAngle) * radius,
        y: Math.sin(frattaleAlignedRadialAngle) * radius,
      }

      frattaliLines[division][p] = {
        x: frattalePoint.x + center.x,
        y: center.y - frattalePoint.y,
      }
    }
  }

  return frattaliLines
}

export const drawLines = ({ ctx, lines, center }) => {
  for (let l = 0; l < lines.length; l++) {
    const { divisions, color, thickness, points } = lines[l]

    const frattaliLines = getFrattaliLines({ divisions, points, center })

    for (let i = 0; i < frattaliLines.length; i++) {
      const frattaleLine = frattaliLines[i]
      ctx.beginPath()
      for (let f = 0; f < frattaleLine.length; f++) {
        const frattalePoint = frattaleLine[f]
        ctx.lineTo(frattalePoint.x, frattalePoint.y)
        ctx.lineWidth = thickness
        ctx.strokeStyle = color
      }
      ctx.stroke()
      ctx.closePath()
    }
  }
}

export const drawBackground = ({ ctx, backgroundColor, width, height }) => {
  const ratio = window.devicePixelRatio
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width * ratio, height * ratio)
}
