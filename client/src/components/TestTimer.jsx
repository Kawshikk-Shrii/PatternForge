import { useEffect, useState } from "react";

const TestTimer = ({ minutes, onExpire }) => {
  const [seconds, setSeconds] = useState((minutes || 30) * 60);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire?.();
      return undefined;
    }
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, onExpire]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return <div className="rounded-lg bg-forge/15 px-4 py-2 font-mono text-lg text-forge">{mm}:{ss}</div>;
};

export default TestTimer;

