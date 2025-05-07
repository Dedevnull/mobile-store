import React from 'react';
import { Link } from 'react-router';
import { ProductImage } from './ProductImage';

export const ProductCard = ({ product }) => {
    const { id, brand, model, price } = product;
    return (
        <Link to={`/products/${id}`} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
            <div className='flex justify-center w-full'>
                <ProductImage product={product} />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-600">{brand}, {model}</h2>
                <p className="text-gray-800 text-lg font-semibold mt-2 flex-grow">{price === "" ? "" : `${price} €`}</p>
            </div>
        </Link>
    );
};