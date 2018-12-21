function getCartesianPoint(point, canvasCenter){
  const { x: xp, y: yp } = point;
  const { x: xc, y: yc } = canvasCenter;
  return {
    x: xp - xc,
    y: yc - yp
  }
}

function getCanvasPoint(point, canvasCenter, ){
  const { x: xp, y: yp } = point;
  const { x: xc, y: yc } = canvasCenter;
  return {
    x: xc + xp,
    y: yc - yp
  }
}


function drawEffect({f, ctx, effect,frattalePoint, lastPoint, color}){

  if(effect === 'noise'){
    if(Math.random(0,1)*100 > 99.5) {
      ctx.lineTo(frattalePoint.x + Math.random(-1,1)* 30 ,frattalePoint.y+ Math.random(-1,1)* 30);

    }
  }

  if(effect === 'tree'){
    if(f % 30 === 0){
      ctx.lineTo(frattalePoint.x + Math.random(-1,1)* 20 ,frattalePoint.y+ Math.random(-1,1)* 20);
    }
    
  }
  if(effect === "japanese"){
    ctx.stroke();
    ctx.closePath();  
    
   
    const dx = frattalePoint.x - lastPoint.x;
    const dy = frattalePoint.y - lastPoint.y;
    const d = dx * dx + dy * dy;
    if (d < 1000) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x + (dx * 0.2), lastPoint.y + (dy * 0.2));
      ctx.lineTo(frattalePoint.x - (dx * 0.2), frattalePoint.y - (dy * 0.2));
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();  
    
    }
  }

}


export const drawFrattali = ({ctx, line, canvasCenter }) => {
  
  const { frattali, color, points, effect } = line
  let frattaliLines = Array.from({length: frattali}, (e) => [])

  for (let p = 0; p < points.length; p++) {

    const point = getCartesianPoint(points[p], canvasCenter)
    const radius = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y,2))
    const alpha = Math.atan2(point.y, point.x) * 180 / Math.PI;
    const anglePointToCenter = alpha < 0 ? 180 + (180 + alpha) : alpha
    const angles = Array.from({length: frattali}, (e, index) =>( 360 / frattali)*(index + 1))
    
    for (let i = 0; i < angles.length; i++) {  
      const frattaleAngle = angles[i];
      const frattaleX = Math.cos((anglePointToCenter - frattaleAngle)*Math.PI/180) * radius
      const frattaleY = Math.sin((anglePointToCenter - frattaleAngle )*Math.PI/180) * radius
      const frattalePoint = getCanvasPoint({
        x: frattaleX,
        y: frattaleY
      }, canvasCenter)

      frattaliLines[i][p] = frattalePoint
    }
  }


  


  for (let i = 0; i < frattaliLines.length; i++) {
    const frattaleLine = frattaliLines[i];

    
    ctx.beginPath();
    for (let f = 0; f < frattaleLine.length; f++) {
      const frattalePoint = frattaleLine[f];
      const lastPoint = frattaleLine[frattaleLine.length-1]

      if(effect !== "japanese") ctx.lineTo(frattalePoint.x,frattalePoint.y);

      if(effect){
        drawEffect({f, ctx, effect, frattalePoint,lastPoint, color })
      }


      ctx.strokeStyle=color
    }
    ctx.stroke();
    ctx.closePath();  
  }
}




// }