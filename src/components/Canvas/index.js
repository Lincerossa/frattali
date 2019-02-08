import React, { useEffect, useRef } from "react";
import { useGetCenter } from "../../useHooks";
import { drawBackground, drawLines } from "./draw";

export default ({ width, height, backgroundColor, hd, lines }) => {
  const canvas = useRef(null);
  const { center } = useGetCenter(canvas);

  useEffect(
    () => {
      if (hd) {
        canvas.current.style.width = `${window.innerWidth}px`;
        canvas.current.style.height = `${window.innerHeight}px`;
        const ratio = window.devicePixelRatio;
        canvas.current.width = width * ratio;
        canvas.current.height = height * ratio;
        canvas.current.getContext("2d").scale(ratio, ratio);
      }
    },
    [canvas.current, width, height, hd]
  );

  useEffect(
    () => {
      if (center) {
        drawBackground({
          ctx: canvas.current.getContext("2d"),
          backgroundColor,
          width,
          height,
        });
        drawLines({
          ctx: canvas.current.getContext("2d"),
          lines,
          center,
        });
      }

      return () => {
        canvas.current.getContext("2d").clearRect(0, 0, width, height);
      };
    },
    [center, lines, backgroundColor, hd]
  );

  return <canvas id="canvas" width={width} height={height} ref={canvas} />;
};
