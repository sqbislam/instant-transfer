'use client';
import { useTimer } from '@/lib/timercontext';
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const { time, countdown } = useTimer();
  const [countDownTime, setCountdownTime] = useState('00:00:00');
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    if (paused) return;
    const remainingTime = Math.max(0, countdown - time);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    setCountdownTime(
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0',
      )}:${String(seconds).padStart(2, '0')}`,
    );
  }, [countdown, paused, time]);

  return (
    <div className=' rounded-sm bg-blue-900 p-2 text-white shadow-md'>
      <div className='font-mono text-xl'>{countDownTime}</div>
    </div>
  );
};

export default CountdownTimer;
