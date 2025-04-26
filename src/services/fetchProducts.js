const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
    const response = await fetch(`${VITE_API_URL}/api/product`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
};