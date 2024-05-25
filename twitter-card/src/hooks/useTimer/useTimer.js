import { useEffect, useState } from "react"

export const useTimer = (initialSeconds = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  const resetTimer = () => {
    setSeconds(initialSeconds);
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return { seconds, resetTimer };
};