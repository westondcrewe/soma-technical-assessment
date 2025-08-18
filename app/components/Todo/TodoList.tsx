"use client";

import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "@prisma/client";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          dueDate={todo.dueDate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
