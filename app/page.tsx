"use client"
import type { Todo } from '@prisma/client';
import { useState, useEffect } from 'react';
import TodoItem from './components/ToDoItem';

export default function Home() {
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState(''); // add state for new dueDate field
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos');
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleAddTodo = async () => {
    console.log("Click add")
    if (!newTodo.trim()) return;
    try {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo, dueDate: dueDate }),
      });
      console.log('Sending POST body:', { title: newTodo, dueDate: dueDate });
      setNewTodo('');
      setDueDate('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleDeleteTodo = async (id:any) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-red-500 flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Things To Do App</h1>
        <div className="flex mb-6">
          <input
            type="text"
            id="todo-title"
            name="todoTitle"
            className="flex-grow p-3 rounded-l-full focus:outline-none text-gray-700"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          
          />
          {/* Due Date Calendar */}
          <input 
            type="date" 
            id="todo-due-date"
            name="todoDueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {/* Add button */}
          <button
            onClick={handleAddTodo}
            className="bg-white text-indigo-600 p-3 rounded-r-full hover:bg-gray-100 transition duration-300"
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo:Todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              dueDate={todo.dueDate}
              onDelete={handleDeleteTodo}
            />))}
        </ul>
      </div>
    </div>
  );
}
