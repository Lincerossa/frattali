import { useEffect, useState } from "react";

export default element => {
  const [mousePosition, setMousePosition] = useState(null);
  const [mouseStatus, setMouseStatus] = useState(null);

  function handleMouseDown() {
    const el = element.current.parentNode;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("touchmove", handleMouseMove, { passive: false });
    el.addEventListener("touchend", handleMouseUp);
    setMouseStatus("mousedown");
  }

  function handleTouchStart(e) {
    handleMouseMove(e);
    handleMouseDown();
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

  useEffect(() => {
    const el = element.current.parentNode;

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.addEventListener("touchstart", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("touchend", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("touchmove", handleMouseMove);
    };
  }, [element]);

  return {
    mousePosition,
    mouseStatus,
  };
};
