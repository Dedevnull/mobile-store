import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fetchProducts';

export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const { brand, model } = product;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return brand.toLowerCase().includes(searchTermLowerCase) || model.toLowerCase().includes(searchTermLowerCase);
  });

  return {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
    loading,
    error,
  };
  
};
