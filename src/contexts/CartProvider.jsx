import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const addOne = () => {
        setCount(count + 1);
    };
    return <CartContext.Provider value={{ count, addOne }}>{children}</CartContext.Provider>;
};