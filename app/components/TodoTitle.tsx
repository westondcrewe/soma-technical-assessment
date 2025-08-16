'use client';
import React from 'react';

type TodoTitleProps = {
  title: string;
};

export default function TodoTitle({ title }: TodoTitleProps) {
  return (
    <span
      className="block text-gray-800 max-w-[250px] truncate group-hover:whitespace-normal group-hover:overflow-visible"
      title={title}
    >
      {title}
    </span>
  );
}
