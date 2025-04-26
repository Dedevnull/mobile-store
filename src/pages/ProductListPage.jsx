import React from 'react';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { SearchInput } from '../components/SearchInput';

export const ProductListPage = () => {
    const { products, searchTerm, setSearchTerm, loading, error } = useProducts();



    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='min-w-full px-5 xl:px-[15%] bg-slate-50 flex flex-col justify-center'>
            <div className='flex flex-col md:flex-row lg:flex-row justify-between'>
                <h2 className="text-3xl font-bold mb-8 text-center">Mobile Devices</h2>
                <SearchInput value={searchTerm} onSearch={setSearchTerm} />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-10'>
                {
                    products.map((product) => {
                        return <ProductCard key={`product_list_item_${product.id}`} product={product} />
                    })
                }
            </div>
        </div>
    );
};
