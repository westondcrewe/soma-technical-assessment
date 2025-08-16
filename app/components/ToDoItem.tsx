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
    const today = new Date();
    const isOverdue = dueDate ? new Date(dueDate) < today : false;
    return (
        <li className="flex justify-between items-center bg-white bg-opacity-90 p-4 mb-4 rounded-lg shadow-lg">
        <div>
            <span className="block text-gray-800 truncate overflow-hidden whitespace-nowrap max-w-[350px] group-hover:whitespace-normal group-hover:overflow-visible">{title}</span>
            {dueDate && (
            <span className="text-gray-500 text-sm ml-1">
            (due {new Date(dueDate).toLocaleDateString()})
            </span>
            )}
        </div>

        <DeleteButton id={id} onDelete={onDelete}
        />
        </li>
    );
}
