import React from 'react';
import { Link } from 'react-router';

export const ProductCard = ({ product, onAddToCart }) => {
    const { id, name, brand, model, price, imgUrl } = product;
    return (
        <Link to={`/products/${id}`} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
            <div className='flex justify-center w-full'>
                <img
                    src={imgUrl}
                    alt={name}
                    className="w-full max-w-50 object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-600">{brand}, {model}</h2>
                <p className="text-gray-800 text-lg font-semibold mt-2 flex-grow">{price === "" ? "" : `${price} €`}</p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(product);
                    }}
                    className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};