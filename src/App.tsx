import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import TodoList from './components/TodoList';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Productivity Hub</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <PomodoroTimer />
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex flex-col gap-8">
              <Canvas />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;