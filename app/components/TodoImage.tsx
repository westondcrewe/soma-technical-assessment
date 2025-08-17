'use client';

import { useEffect, useState } from 'react';
import { fetchPexelsImage } from "@/lib/pexels";

type TodoImageProps = {
  title: string;
};

export default function TodoImage({ title }: TodoImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      const img = await fetchPexelsImage(title);
      setImageUrl(img);
    }
    loadImage();
  }, [title]);

  if (!imageUrl) return null;

  return (
    <img
      src={imageUrl}
      alt={title}
      className="w-28 h-28 object-cover rounded-md flex-shrink-0 mr-4"
    />
  );
}