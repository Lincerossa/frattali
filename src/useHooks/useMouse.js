import { useEffect, useState } from "react";

export default item => {
  const [mousePosition, setMousePosition] = useState(null);
  const [mouseStatus, setMouseStatus] = useState(null);

  function handleMouseDown() {
    const el = item.current.parentNode;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("touchmove", handleMouseMove, { passive: false });
    el.addEventListener("touchend", handleMouseUp);
    setMouseStatus("mousedown");
  }

  function handleMouseUp() {
    setMouseStatus("mouseup");
  }

  function handleMouseMove(e) {
    setMousePosition({
      x: e.clientX || (e.touches && e.touches[0].clientX),
      y: e.clientY || (e.touches && e.touches[0].clientY),
    });
  }

  useEffect(
    () => {
      const el = item.current.parentNode;

      el.addEventListener("mousedown", handleMouseDown);
      el.addEventListener("touchstart", handleMouseDown, { passive: false });

      return () => {
        el.removeEventListener("mousedown", handleMouseDown);
        el.addEventListener("touchstart", handleMouseDown);

        el.removeEventListener("mouseup", handleMouseUp);
        el.removeEventListener("touchend", handleMouseUp);
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("touchmove", handleMouseMove);
      };
    },
    [item]
  );

  return {
    mousePosition,
    mouseStatus,
  };
};
