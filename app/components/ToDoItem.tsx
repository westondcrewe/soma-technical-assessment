'use client';
import React from 'react';
import DeleteButton from './DeleteButton';
import TodoTitle from './TodoTitle';
import TodoDueDate from './TodoDueDate';

type TodoItemProps = {
  id: number;
  title: string;
  dueDate?: Date | null;
  onDelete: (id: number) => void;
};

export default function TodoItem({ id, title, dueDate, onDelete }: TodoItemProps) {
  return (
    <li className="relative flex justify-between items-start bg-white bg-opacity-90 p-4 mb-4 rounded-lg shadow-lg group">
      <div className="flex-1 relative">
        <TodoTitle title={title} />
        <TodoDueDate dueDate={dueDate} />
      </div>
      <DeleteButton id={id} onDelete={onDelete} />
    </li>
  );
}
