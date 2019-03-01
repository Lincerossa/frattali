import React, { useRef, useState, useEffect } from "react";

function SizeMe(props) {
  const myRef = useRef(null);
  const [size, updateSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    handleUpdateSize();
  }, []);

  const handleUpdateSize = () => {
    const ref = myRef.current;
    updateSize({
      width: ref.clientWidth,
      height: ref.clientHeight,
    });
  };

  return (
    <div style={{ width: "100%" }} ref={myRef}>
      {props.children({ ...props, size })}
    </div>
  );
}

export default SizeMe;
