import React from 'react';

export const ProductImage = (props) => {
    const { product } = props;
    return (
        <img
            src={product.imgUrl}
            alt={`${product.brand}_${product.model}`}
        />
    );
};
