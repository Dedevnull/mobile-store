import React from 'react';
import { FaCartPlus } from "react-icons/fa";

export const AddToCardButton = () => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
            }}
            className="min-w-6 min-h-7 mt-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
        >
            <FaCartPlus />
        </button>
    );
};
