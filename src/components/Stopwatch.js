import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const lapListRef = useRef(null);

  // Circular progress ring
  const circleRadius = 134;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = (time % 60000) / 60000;
  const offset = circleCircumference * (1 - progress);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (time) => {
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const getMinutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const getMilliseconds = `0${(time % 1000).toString().slice(0, 2)}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  const startStopwatch = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    const updatedLaps = [...laps, time];
    setLaps(updatedLaps);

    setTimeout(() => {
      if (lapListRef.current) {
        lapListRef.current.scrollTop = lapListRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="stopwatch-container">
      {/* Progress ring */}
      <div className="progress-ring-wrapper">
        <svg className="progress-ring" width="280" height="280">
          <circle
            className="progress-ring__circle"
            stroke="#00ffff"
            strokeWidth="6"
            fill="transparent"
            r={circleRadius}
            cx="140"
            cy="140"
            style={{
              strokeDasharray: circleCircumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
      </div>

      {/* Time Display */}
      <div className="stopwatch-time">{formatTime(time)}</div>

      {/* Controls */}
        <div className="stopwatch-controls">
  <button onClick={startStopwatch}>
    ▶️
    <div className="btn-label">Start</div>
  </button>
  <button onClick={pauseStopwatch}>
    ⏸️
    <div className="btn-label">Pause</div>
  </button>
  <button onClick={recordLap}>
    📍
    <div className="btn-label">Lap</div>
  </button>
  <button onClick={resetStopwatch}>
    🔁
    <div className="btn-label">Reset</div>
  </button>
</div>

      {/* Lap List */}
      <ul
        className="lap-list"
        ref={lapListRef}
        style={{
          maxHeight: laps.length > 3 ? "100px" : "auto",
          overflowY: laps.length > 3 ? "auto" : "hidden",
        }}
      >
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
