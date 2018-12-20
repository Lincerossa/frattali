import { useEffect, useState } from "react";
function TimeHandler(props) {
  const [initialTime, setInitialTime] = useState(0);
  const [currentTime, updateCurrentTime] = useState(0);

  const handleUpdateCurrentTime = timer => {
    if (!initialTime) {
      setInitialTime(timer);
    }
    const currentTime = timer - initialTime;
    updateCurrentTime(currentTime);
  };

  useEffect(
    () => {
      let myTimer = requestAnimationFrame(handleUpdateCurrentTime);
      return () => {
        cancelAnimationFrame(myTimer);
      };
    },
    [currentTime]
  );

  return props.children({ ...props, currentTime });
}

export default TimeHandler;
