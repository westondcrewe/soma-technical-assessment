"use client";

import TodoTitle from "./TodoTitle";
import TodoDueDate from "./TodoDueDate";
import DeleteButton from "./DeleteButton";
import TodoImage from "./TodoImage";

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
  return (
    <li className="flex items-center bg-white bg-opacity-90 p-4 mb-4 rounded-lg shadow-lg group w-full max-w-3xl">
      {/* left - image */}
      <div className="flex-shrink-0 w-20 h-20 mr-4">
        <TodoImage title={title} />
      </div>

      {/* middle - text - title & due date with hover displays */}
      <div className="flex-1">
        <TodoTitle title={title} />
        <TodoDueDate dueDate={dueDate} />
      </div>

      {/* right - delete button */}
      <DeleteButton id={id} onDelete={onDelete} />
    </li>
  );
}
