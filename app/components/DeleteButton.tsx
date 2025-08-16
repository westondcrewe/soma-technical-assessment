'use client';

type DeleteButtonProps = {
    id: number;
    onDelete: (id: number) => void;
};

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
    return (
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
    )};