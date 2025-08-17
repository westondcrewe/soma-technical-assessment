"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type TodoImageProps = {
  title: string;
};

export default function TodoImage({ title }: TodoImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(title)}&per_page=1`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY as string,
          },
        });
        const data = await res.json();
        setImageUrl(data.photos?.[0]?.src?.medium ?? null);
      } catch (err) {
        console.error("Failed to fetch image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [title]);

  return (
    <div className="w-full h-full rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
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
