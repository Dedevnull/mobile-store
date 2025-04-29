import React from 'react';
import { useParams } from 'react-router';
import { Loader } from '../components/Loader';
import { ProductActions } from '../components/ProductActions';
import { ProductDetailDescription } from '../components/ProductDetailsDescription';
import { useProduct } from '../hooks/useProduct';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='min-w-full px-5 bg-slate-50 flex flex-col xl:flex-row lg:flex-row justify-center'>
      <div className="flex justify-center xl:w-1/2 lg:w-1/2">
        <img src={product.imgUrl} alt={`${product.brand}_${product.model}`} className="max-w-full max-h-[600px] object-contain" />
      </div>
      <div>
        <ProductDetailDescription product={product} />
        <div className='min-w-full mt-5'>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
};
