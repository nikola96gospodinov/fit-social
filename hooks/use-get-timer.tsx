import { useState, useRef, useEffect } from "react";

type Props = {
  startTime?: Date;
};

export const useGetTimer = ({ startTime = new Date() }: Props) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(startTime.getTime());
  const animationFrameRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = startTime.getTime();

    const updateTimer = () => {
      setElapsedTime(Date.now() - startTimeRef.current);
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    };

    animationFrameRef.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [startTime]);

  return elapsedTime;
};
