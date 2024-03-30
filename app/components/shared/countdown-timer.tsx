'use client';
import { useTimer } from '@/lib/timercontext';
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const { time, countdown } = useTimer();
  const [countDownTime, setCountdownTime] = useState('');
  useEffect(() => {
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
  }, [countdown, time]);

  return (
    <div className='rounded-lg bg-gray-900 p-4 text-white shadow-md'>
      <h2 className='mb-2 text-xl font-bold'>Timer</h2>
      <div className='font-mono text-2xl'>{countDownTime}</div>
    </div>
  );
};

export default CountdownTimer;
