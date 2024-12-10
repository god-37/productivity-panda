import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerDisplayProps {
  time: number;
  isBreak: boolean;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  time,
  isBreak,
  isRunning,
  onToggle,
  onReset,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-500 mb-2">
        {formatTime(time)}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        {isBreak ? 'Break Time' : 'Focus Time'}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={onToggle}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={onReset}
          className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;
