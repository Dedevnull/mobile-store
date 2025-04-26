import React from 'react';
import { CiMobile4 } from "react-icons/ci";
import { IoCart } from "react-icons/io5";
import { Link } from 'react-router';
import { Breadcrumbs } from './Breadcrumbs';

export const Header = () => {
    return (
        <div className='bg-slate-800 shadow-lg flex items-center justify-around py-3  px-32 fixed top-0 left-0 w-full'>
            <Link to="/">
                <span className='font-semibold text-lg flex items-center gap-3 text-blue-400 '>
                    <CiMobile4 className='text-6xl' />
                    <span className='font-semibold text-2xl pl-0.5'>Mobile Store</span>
                </span>
            </Link>
            <Breadcrumbs />
            <div className='flex items-center gap-5 text-black'>
                <div className='py-1 px-3 text-lg font-light text-white hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-100'>
                    <span className='font-semibold text-lg flex items-center text-blue-400'>
                        <IoCart className='text-4xl' /> Cart
                    </span>
                </div>
            </div>
        </div>
    );
};