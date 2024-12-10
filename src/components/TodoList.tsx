import React, { useState } from 'react';
import { Plus, X, Check, Pencil } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() && todos.length < 50) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Todo List ({todos.length}/50)</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task..."
          disabled={todos.length >= 50}
        />
        <button
          onClick={addTodo}
          className={`p-2 ${todos.length >= 50 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg`}
          disabled={todos.length >= 50}
        >
          <Plus size={24} />
        </button>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`p-1 rounded-full ${
                todo.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              <Check size={16} />
            </button>
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                className="flex-1 px-2 py-1 border rounded"
                autoFocus
              />
            ) : (
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
            )}
            {editingId === todo.id ? (
              <button
                onClick={saveEdit}
                className="p-1 text-green-600 hover:text-green-700"
              >
                <Check size={20} />
              </button>
            ) : (
              <button
                onClick={() => startEditing(todo)}
                className="p-1 text-gray-600 hover:text-gray-700"
              >
                <Pencil size={20} />
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-600 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;