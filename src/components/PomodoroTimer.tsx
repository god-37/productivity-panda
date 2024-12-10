import React, { useState, useEffect, useRef } from 'react';
import TimerDial from './timer/TimerDial';
import TimerDisplay from './timer/TimerDisplay';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [duration, setDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const timerRef = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            return isBreak ? duration : breakDuration;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, isBreak, duration, breakDuration]);

  const handleDurationChange = (newValue: number) => {
    const newDuration = newValue * 60;
    if (!isBreak) {
      setDuration(newDuration);
      setTimeLeft(newDuration);
    } else {
      const maxBreak = Math.min(newDuration, 30 * 60);
      setBreakDuration(maxBreak);
      setTimeLeft(maxBreak);
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setIsBreak(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col items-center">
        <TimerDial
          value={Math.floor(timeLeft / 60)}
          maxValue={240}
          size={320}
          onChange={handleDurationChange}
          isActive={isRunning}
        />
        <div className="mt-8">
          <TimerDisplay
            time={timeLeft}
            isBreak={isBreak}
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;