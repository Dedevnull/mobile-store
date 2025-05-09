const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchAddToCart = async ({ id, colorCode, storageCode }) => {

    const response = await fetch(`${VITE_API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ id, colorCode, storageCode }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }
    
    const data = await response.json();

    return data;
};