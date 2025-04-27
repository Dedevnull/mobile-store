const VITE_CACHE_DURATION_MILLIS = import.meta.env.VITE_CACHE_DURATION_MILLIS;

export const getCache = (key) => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

export const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({
    timestamp: Date.now(),
    data
  }));
};

export const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < VITE_CACHE_DURATION_MILLIS;
};