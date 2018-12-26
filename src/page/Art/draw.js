export const drawLines =  ({ ctx, lines, center }) => {
  for (let l = 0; l < lines.length; l++) {
    const { frattali, color, thickness, points, effect } = lines[l];  
    const frattaliLines = Array.from({ length: frattali }, e => []);
    for (let p = 0; p < points.length; p++) {
      const point = points[p]
      const radius = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
      const alpha = (Math.atan2(point.y, point.x) * 180) / Math.PI;
      const anglePointToCenter = alpha < 0 ? 360 + alpha : alpha;
      const angles = Array.from(
        { length: frattali },
        (e, index) => (360 / frattali) * (index + 1)
      );
      for (let a = 0; a < angles.length; a++) {
        const frattaleAngle = angles[a]
        const frattalePoint = {
          x:  Math.cos(((anglePointToCenter - frattaleAngle) * Math.PI) / 180) *
          radius,
          y: Math.sin(((anglePointToCenter - frattaleAngle) * Math.PI) / 180) *
          radius
        }
        frattaliLines[a][p] = {
          x: frattalePoint.x + center.x,
          y: center.y - frattalePoint.y,
        };
      }
    }

    for (let i = 0; i < frattaliLines.length; i++) {
      const frattaleLine = frattaliLines[i];

      ctx.beginPath();

      for (let f = 0; f < frattaleLine.length; f++) {

        const frattalePoint = frattaleLine[f]

        if (effect === "noise") {
          ctx.lineTo(frattalePoint.x, frattalePoint.y)
          if (Math.random(0, 1) * 100 > 99.5) {
            ctx.lineTo(
              frattalePoint.x + Math.random(-1, 1) * 30,
              frattalePoint.y + Math.random(-1, 1) * 30
            );
          }
        }
      
        if (effect === "tree") {
          ctx.lineTo(frattalePoint.x, frattalePoint.y)
          if (f % 30 === 0) {
            ctx.lineTo(
              frattalePoint.x + Math.random(-1, 1) * 20,
              frattalePoint.y + Math.random(-1, 1) * 20
            );
          }
        }
        if (effect === "japanese") {
          ctx.stroke();
          ctx.closePath();
          const lastPoint = frattaleLine[frattaleLine.length - 1];
      
          const dx = frattalePoint.x - lastPoint.x;
          const dy = frattalePoint.y - lastPoint.y;
          const d = dx * dx + dy * dy;
          if (d < 1000) {
            ctx.beginPath();
            ctx.moveTo(lastPoint.x + dx * 0.2, lastPoint.y + dy * 0.2);
            ctx.lineTo(frattalePoint.x - dx * 0.2, frattalePoint.y - dy * 0.2);
            ctx.lineWidth = thickness;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
          }
        }
        if(!effect){
          ctx.lineTo(frattalePoint.x, frattalePoint.y)
        }
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
      }
      ctx.stroke();
      ctx.closePath();
    }

  }
};



export const drawBackground = ({ ctx, backgroundColor, width, height}) => {
  const ratio = window.devicePixelRatio;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width * ratio, height * ratio);
}