import { prisma } from "./prisma";

export async function fetchPexelsImage(todoId: number, title: string): Promise<string | null> {
  // return URL if cached in database
  const existing = await prisma.todo.findUnique({
    where: { id: todoId },
    select: { imageURL: true }, // this assumes your Prisma schema has imageURL: string?
  });

  if (existing?.imageURL) return existing.imageURL;

  // find image with title using Pexels API
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  if (!apiKey) {
    console.error("Pexels API key is missing");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(title)}&per_page=1`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch from Pexels:", response.statusText);
      return null;
    }

    const data = await response.json();
    const url: string | null = data.photos?.[0]?.src?.medium ?? null;

    // store URL in the database
    if (url) {
      await prisma.todo.update({
        where: { id: todoId },
        data: { imageURL: url },
      });
    }

    return url;
  } catch (err) {
    console.error("Error fetching from Pexels:", err);
    return null;
  }
}
