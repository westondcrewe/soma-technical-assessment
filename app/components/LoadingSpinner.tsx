'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-24 h-24">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}