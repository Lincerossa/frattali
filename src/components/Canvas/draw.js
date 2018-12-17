function getCartesianPoint(point, canvasCenter){
  const { x: xp, y: yp } = point;
  const { x: xc, y: yc } = canvasCenter;
  return {
    x: xp - xc,
    y: yc - yp
  }
}

function getCanvasPoint(point, canvasCenter){
  const { x: xp, y: yp } = point;
  const { x: xc, y: yc } = canvasCenter;
  return {
    x: xc + xp,
    y: yc - yp
  }
}




export const drawFrattali = ({ctx, line, frattali, canvasCenter}) => {
          
  for (let p = 0; p < line.length; p++) {
    // CARTESIANO/////////////
    const { x, y } = getCartesianPoint(line[p], canvasCenter)
    const radius = Math.sqrt(Math.abs(Math.pow(x, 2) + Math.pow(y,2)))
    const alpha = Math.atan2(y, x) * 180 / Math.PI;
    const pointAngle = alpha < 0 ? 180 + (180 + alpha) : alpha
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
      }, canvasCenter)

      
      ctx.moveTo(frattalePoint.x,frattalePoint.y);
      ctx.lineTo(frattalePoint.x+1, frattalePoint.y+1)
      ctx.strokeStyle="#ac00ff"
     
      ctx.stroke();
    }
  }
}