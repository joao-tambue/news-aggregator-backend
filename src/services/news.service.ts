import { env } from "../config/env";

type CacheItem = {
  data: any;
  expiresAt: number;
};

const cache = new Map<string, CacheItem>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutos

export async function fetchTopHeadlines(category: string) {
  const now = Date.now();

  const cacheKey = `news-${category}`;
  const cached = cache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const url = `${env.NEWS_API_URL}?country=us&category=${category}&apiKey=${env.NEWS_API_KEY}`;
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