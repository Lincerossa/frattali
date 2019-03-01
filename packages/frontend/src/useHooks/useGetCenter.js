import { useEffect, useState } from "react";

export default ref => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
      ref && ref.current;

    setCenter({
      y: offsetHeight / 2 - offsetTop,
      x: offsetWidth / 2 + offsetLeft,
    });
  }, [ref && ref.current]);

  return { center };
};
