import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleInputChange = () => {
    const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    setTime(totalSeconds);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const formattedHours = Math.floor(time / 3600);
    const formattedMinutes = Math.floor((time % 3600) / 60);
    const formattedSeconds = time % 60;
    return `${formattedHours}:${formattedMinutes < 10 ? '0' : ''}${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
  };

  return (
    <div>
      <div>
        <br/>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
          min="0"
          max="23"
          onBlur={handleInputChange}
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Minutes"
          min="0"
          max="59"
          onBlur={handleInputChange}
        />
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="Seconds"
          min="0"
          max="59"
          onBlur={handleInputChange}
        />
        <button onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
      <div>{formatTime(time)}</div>
      <br/>
      <br/>
    </div>
    
  );
};

export default CountdownTimer;
