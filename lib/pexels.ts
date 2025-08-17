export async function fetchPexelsImage(query: string): Promise<string | null> {
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
        {
          headers: {
            Authorization: apiKey ?? "",
          },
        }
      );
  
      if (!response.ok) {
        console.error("Failed to fetch from Pexels", response.statusText);
        return null;
      }
  
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium;
      }
  
      return null;
    } catch (err) {
      console.error("Error fetching from Pexels:", err);
      return null;
    }
  }