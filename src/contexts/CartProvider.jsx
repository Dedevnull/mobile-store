import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const increaseCount = () => {
        setCount(prev => prev + 1);
    };
    return <CartContext.Provider value={{ count, increaseCount }}>{children}</CartContext.Provider>;
};