import React from 'react'
import { Link } from 'react-router';

export const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Link to={`/products/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
            <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-2 flex-grow">{product.description}</p>
                <button
                    onClick={() => onAddToCart(product)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};