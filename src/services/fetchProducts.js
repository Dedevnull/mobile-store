import { getCache, isCacheValid, setCache } from "../utils/cacheUtils";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const CACHE_KEY = 'products_cache';

export const fetchProducts = async () => {
    const cachedData = getCache(CACHE_KEY);
    
    if (cachedData && isCacheValid(cachedData.timestamp)) {
        return cachedData.data;
    }

    const response = await fetch(`${VITE_API_URL}/api/product`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();

    setCache(CACHE_KEY, data);

    return data;
};