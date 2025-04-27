import React from 'react'
import { AddToCardButton } from './AddToCardButton'

export const ProductActions = ({ product }) => {
    return (
        <div className='min-w-full'>
            <select>
                <option>Almacenamiento</option>
            </select>
            <select>
                <option>Colores</option>
            </select>
            <div>
                <AddToCardButton product={product} />
            </div>
        </div>
    )
}
