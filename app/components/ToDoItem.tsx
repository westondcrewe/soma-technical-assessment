"use client";

import React from "react";
import DeleteButton from "./DeleteButton";

type TodoItemProps = {
  id: number;
  title: string;
  dueDate?: Date | null;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  id,
  title,
  dueDate,
  onDelete,
}: TodoItemProps) {
  const today = new Date();
  const isOverdue = dueDate ? new Date(dueDate) < today : false;
  return (
    <li className="relative flex justify-between items-start bg-white bg-opacity-90 p-4 mb-4 rounded-lg shadow-lg group">
      <div className="flex-1 relative">
        {/* handle long title text overflow with full text hovering */}
        <span
          className="block text-gray-800 max-w-[350px] truncate group-hover:whitespace-normal group-hover:overflow-visible"
          title={title}
        >
          {title}
        </span>
        {dueDate && (
          // handle red font on overdue todos
          <span
            className={`text-sm ml-1 ${
              isOverdue ? `text-red-500` : `text-gray-500`
            }`}
          >
            (due {new Date(dueDate).toLocaleDateString()})
          </span>
        )}
      </div>

      <DeleteButton id={id} onDelete={onDelete} />
    </li>
  );
}
