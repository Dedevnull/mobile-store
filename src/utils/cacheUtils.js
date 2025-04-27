const CACHE_DURATION = 60 * 60 * 1000;

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
  return Date.now() - timestamp < CACHE_DURATION;
};