'use client';

import React from 'react';

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

      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 transition duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
