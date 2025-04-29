import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useForm } from '../hooks/useForm';
import { fetchAddToCart } from '../services/fetchAddToCart';
import { Select } from './Select';

export const ProductActions = ({ product }) => {
    const { increaseCount } = useContext(CartContext);
    const options = product.options;
    const { colors, storages } = options;

    const { form, onChange } = useForm({
        colorCode: colors.length === 1 ? colors[0].code : null,
        storageCode: storages.length === 1 ? storages[0].code : null,
    });

    const addToCart = async (event) => {
        event.preventDefault();
        if (form["colorCode"] === null || form["storageCode"] === null) {
            alert("Please select a color or storage");
            return;
        }

        const added = await fetchAddToCart({ ...form, id: product.id });
        if (added.count) increaseCount(added.count);
    };

    return (
        <form onSubmit={addToCart} method='POST'>
            <div className='min-w-full flex flex-row xl:flex-row lg:flex-row md:flex-row  justify-around'>
                <Select label="Colors" name="colorCode" options={colors} onChange={onChange} />
                <Select label="Storages" name="storageCode" options={storages} onChange={onChange} />
                <div className='pt-5'>
                    <button
                        type='submit'
                        className="min-w-6 min-h-7 mt-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
                    >
                        <span className='flex'>Add To Cart</span>
                    </button>
                </div>
            </div>
        </form>
    );
};
