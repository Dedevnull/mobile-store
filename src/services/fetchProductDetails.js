import { getCache, isCacheValid, setCache } from "../utils/cacheUtils";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const CACHE_KEY = 'product_details_cache';

export const fetchProductDetails = async (id) => {
    const cachedData = getCache(`${CACHE_KEY}_${id}`);
    if (cachedData && isCacheValid(cachedData.timestamp)) {
        return cachedData.data;
    }

    const response = await fetch(`${VITE_API_URL}/api/product/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    
    const data = await response.json();

    setCache(`${CACHE_KEY}_${id}`, data);

    return data;
};