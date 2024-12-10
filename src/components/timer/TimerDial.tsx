import React, { useRef, useEffect, useState } from 'react';

interface TimerDialProps {
  value: number;
  maxValue: number;
  size: number;
  onChange: (value: number) => void;
  isActive: boolean;
}

export const TimerDial: React.FC<TimerDialProps> = ({ value, maxValue, size, onChange, isActive }) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
    if (!isActive) {
      setIsDragging(true);
      updateTime(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (isDragging && !isActive) {
      updateTime(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const updateTime = (e: React.MouseEvent<SVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    const angle = Math.atan2(y, x);
    let degrees = (angle * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;
    
    const newValue = Math.round((degrees / 360) * maxValue);
    onChange(Math.max(1, Math.min(newValue, maxValue)));
  };

  const radius = size / 2 - 20;
  const center = size / 2;
  
  // Create tick marks
  const ticks = [];
  const numTicks = 48; // One tick every 5 minutes for 4 hours
  for (let i = 0; i < numTicks; i++) {
    const angle = (i * 360) / numTicks;
    const isHour = i % (numTicks / 4) === 0;
    const tickLength = isHour ? 15 : 8;
    const tickWidth = isHour ? 2 : 1;
    
    const startX = center + (radius - tickLength) * Math.cos((angle - 90) * Math.PI / 180);
    const startY = center + (radius - tickLength) * Math.sin((angle - 90) * Math.PI / 180);
    const endX = center + radius * Math.cos((angle - 90) * Math.PI / 180);
    const endY = center + radius * Math.sin((angle - 90) * Math.PI / 180);
    
    ticks.push(
      <line
        key={i}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#CBD5E1"
        strokeWidth={tickWidth}
      />
    );
  }

  // Calculate hand position
  const angle = (value / maxValue) * 360 - 90;
  const handX = center + radius * 0.8 * Math.cos(angle * Math.PI / 180);
  const handY = center + radius * 0.8 * Math.sin(angle * Math.PI / 180);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className={`${!isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
    >
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="8"
      />
      
      {/* Tick marks */}
      {ticks}
      
      {/* Timer progress */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="8"
        strokeDasharray={`${(value / maxValue) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
        transform={`rotate(-90 ${center} ${center})`}
      />
      
      {/* Hand */}
      <line
        x1={center}
        y1={center}
        x2={handX}
        y2={handY}
        stroke="#3B82F6"
        strokeWidth="3"
      />
      
      {/* Center dot */}
      <circle
        cx={center}
        cy={center}
        r="8"
        fill="#3B82F6"
      />
    </svg>
  );
};

export default TimerDial;