"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type TodoImageProps = {
  id: number;
  title: string;
};

export default function TodoImage({ id, title }: TodoImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/todos/${id}/image`);
        console.log(res)
        const data = await res.json();
        setImageUrl(data.imageURL);
      } catch (err) {
        console.error("Failed to load image:", err);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [id, title]);

  return (
    <div className="w-24 h-20 flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
      {loading ? (
        <LoadingSpinner />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-xs text-gray-400">No image</span>
      )}
    </div>
  );
}
