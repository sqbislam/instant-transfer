'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

const TimerContext = createContext({
  time: 0,
  countdown: 3600,
  updateCountdown: (countdown: number) => {},
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const updateCountdown = (newCountdown: number) => {
    setCountdown(newCountdown);
  };

  return (
    <TimerContext.Provider value={{ time, countdown, updateCountdown }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => React.useContext(TimerContext);
