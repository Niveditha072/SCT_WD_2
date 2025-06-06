import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import LapList from './LapList';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);
    return [hours, minutes, seconds]
      .map((v) => String(v).padStart(2, '0'))
      .join(':');
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const lap = () => {
    setLaps([...laps, formatTime(time)]);
    const audio = new Audio(process.env.PUBLIC_URL + '/ding.mp3');
    audio.play();
  };

  return (
    <motion.div
      className="stopwatch"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        key={time}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {formatTime(time)}
      </motion.h1>
      <div className="buttons">
        <motion.button whileTap={{ scale: 0.9 }} onClick={start}>Start</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={pause}>Pause</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={reset}>Reset</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={lap}>Lap</motion.button>
      </div>
      <LapList laps={laps} />
    </motion.div>
  );
};

export default Stopwatch;

