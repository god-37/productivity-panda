import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen } from 'lucide-react';
import rough from 'roughjs';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = 300; // Fixed height to match Pomodoro
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        setContext(ctx);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setIsDrawing(true);
      setLastX(e.clientX - rect.left);
      setLastY(e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();

    if (isEraser) {
      context.strokeStyle = '#fff';
      context.lineWidth = 20;
    } else {
      context.strokeStyle = '#000';
      context.lineWidth = 2;
    }

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsEraser(false)}
          className={`p-2 rounded ${!isEraser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <Pen size={20} />
        </button>
        <button
          onClick={() => setIsEraser(true)}
          className={`p-2 rounded ${isEraser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <Eraser size={20} />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="border rounded-lg cursor-crosshair w-full bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </div>
  );
};

export default Canvas;
