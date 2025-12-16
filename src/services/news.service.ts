import { env } from "../config/env";

type CacheItem = {
  data: any;
  expiresAt: number;
};

const cache = new Map<string, CacheItem>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutos

export async function fetchTopHeadlines({
  category,
  page = 1,
  pageSize = 40, // +30 garantido
}: {
  category: string;
  page?: number;
  pageSize?: number;
}) {
  const now = Date.now();

  const today = new Date().toISOString().split("T")[0];

  const cacheKey = `news-${category}-${page}-${pageSize}`;
  const cached = cache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const url =
    `${env.NEWS_API_URL}` +
    `?country=us` +
    `&category=${category}` +
    `&page=${page}` +
    `&pageSize=${pageSize}` +
    `&from=${today}` +
    `&apiKey=${env.NEWS_API_KEY}`;

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
