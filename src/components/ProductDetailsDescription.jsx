import React from 'react'

export const ProductDetailDescription = ({ product }) => {
    return (
        <div className='description px-2 text-gray-600'>
            <h1 className='py-2 text-2xl font-bold text-gray-800'>{product.brand}, {product.model}</h1>
            <h2 className='text-xl font-bold text-gray-700 text-end'>{product.price ? `${product.price}` : "---"}  €</h2>
            <ul>
                <li><strong>Marca:</strong> {product.brand ? product.brand : "N/A"}</li>
                <li><strong>Modelo:</strong> {product.model ? product.model : "N/A"}</li>
                <li><strong>Precio:</strong> {product.price ? product.price : "N/A"}</li>
                <li><strong>CPU:</strong> {product.cpu ? product.cpu : "N/A"}</li>
                <li><strong>RAM:</strong> {product.ram ? product.ram : "N/A"}</li>
                <li><strong>Sistema Operativo:</strong> {product.os ? product.os : "N/A"}</li>
                <li><strong>Resolucion de pantalla:</strong> {product.displayResolution ? product.displayResolution : "N/A"}</li>
                <li><strong>Bateria:</strong> {product.battery ? product.battery : "N/A"}</li>
                <li><strong>Camaras:</strong> {product.primaryCamera ? product.primaryCamera.join(", ") : "N/A"}</li>
                <li><strong>Dimensiones:</strong> {product.dimentions ? product.dimentions : "N/A"}</li>
                <li><strong>Peso:</strong> {product.weight ? product.weight : "N/A"}</li>
            </ul>
        </div>
    )
}
