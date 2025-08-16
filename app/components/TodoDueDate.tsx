'use client';
import React from 'react';

type TodoDueDateProps = {
  dueDate?: Date | null;
};

export default function TodoDueDate({ dueDate }: TodoDueDateProps) {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate);
  const isOverdue = due < today;

  // Days until due
  const diffTime = due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let dueText = '';
  if (diffDays === 0) dueText = 'Today';
  else if (diffDays > 0) dueText = `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  else dueText = `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} late`;

  return (
    <div className="flex items-center space-x-2 relative">
      <span className={`block text-sm mt-1 ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
        Due {due.toLocaleDateString()}
      </span>
      <span className={`absolute right-0 top-0 hidden group-hover:block text-sm ${isOverdue ? 'text-red-500' : 'text-gray-400'} font-semibold`}>
        {dueText}
      </span>
    </div>
  );
}
