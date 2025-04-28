import { useEffect, useState } from "react";
import { fetchProductDetails } from "../services/fetchProductDetails";

export const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getProductDetails = async () => {
        try {
          const data = await fetchProductDetails(id);
          setProduct(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      getProductDetails();
    }, [id]);
  
    return { product, loading, error };
  };