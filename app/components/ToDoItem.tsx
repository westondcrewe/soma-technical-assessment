'use client';

import React from 'react';
import DeleteButton from './DeleteButton';

type TodoItemProps = {
  id: number;
  title: string;
  dueDate?: Date | null;
  onDelete: (id: number) => void;
};

export default function TodoItem({ id, title, dueDate, onDelete }: TodoItemProps) {
  return (
    <li className="flex justify-between items-center bg-white bg-opacity-90 p-4 mb-4 rounded-lg shadow-lg">
      <div>
        <span className="text-gray-800 ">{title}</span>
        {dueDate && (
          <span className="text-gray-500 ml-2">
            (due {new Date(dueDate).toLocaleDateString()})
          </span>
        )}
      </div>
        
      <DeleteButton id={id} onDelete={onDelete}
      />
    </li>
  );
}
