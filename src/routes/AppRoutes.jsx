import React from 'react';
import { Route, Routes } from 'react-router';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products">
                <Route index element={<ProductListPage />} />
                <Route path=":id" element={<ProductDetailsPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;