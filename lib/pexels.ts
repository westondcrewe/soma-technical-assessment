import { prisma } from './prisma'

export async function fetchPexelsImageFromAPI(query: string): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
    headers: { Authorization: apiKey ?? "" },
  });
  const data = await res.json();
  return data.photos?.[0]?.src?.medium ?? null;
}