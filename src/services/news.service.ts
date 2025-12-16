import { env } from "../config/env";

type CacheItem = {
  data: any;
  expiresAt: number;
};

type NewsFilters = {
  category?: string;
  search?: string;
  source?: string;
  date?: string;
};

const cache = new Map<string, CacheItem>();
const CACHE_TTL = 1000 * 60 * 5;

export async function fetchTopHeadlines(filters: NewsFilters) {
  const now = Date.now();

  const cacheKey = JSON.stringify(filters);
  const cached = cache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const params = new URLSearchParams({
    country: "us",
    apiKey: env.NEWS_API_KEY,
  });

  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("q", filters.search);
  if (filters.source) params.append("sources", filters.source);
  if (filters.date) params.append("from", filters.date);

  const url = `${env.NEWS_API_URL}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.status}`);
  }

  const data = await response.json();

  cache.set(cacheKey, {
    data,
    expiresAt: now + CACHE_TTL,
  });

  return data;
}